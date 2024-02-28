import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import RNFS from 'react-native-fs';
import {
  CacheType,
  setCacheReject,
  setCompare,
  setDownloadLoader,
  setSuccessDownload,
} from '../actions/loaderActions';
import {
  DownloadProgressType,
  FileDownload,
  FileName,
  FileValidate,
} from '../features/fileManager';
import { navigationRef } from '../routers/RootNavigation';
import { AppThunk } from '../store/store';
import {
  createPushNotificationLoader,
  onUploadTaskEventLoader,
} from './notificationThunks';

// Сравнить файлы если изменены
export const compareFileRecursion =
  ({ caches }: { caches: CacheType[] }): AppThunk =>
  async (dispatch, state) => {
    const filesContinue = state().distribution.filesContinue;
    const gpuSystem = state().app.gpu;
    const modeType = state().settings.modeType;
    const { freeSpace } = await RNFS.getFSInfo();

    let [
      needDownload,
      successCount,
      rejectCount,
      distributionCacheBytes,
      downloadsCacheBytes,
      needDownloadsCacheBytes,
    ] = [[] as CacheType[], 0, 0, 0, 0, 0];

    for await (const cache of caches) {
      const { path, bytes, name, gpu: gpuCache } = cache;
      const bytesValid = bytes.length > 1 ? bytes[modeType] : bytes[0];

      const isValidCache = await FileValidate.isValidCache({
        gpuCache,
        gpuSystem,
        path,
        name,
        bytes: bytesValid,
        filesContinue,
      });

      if (isValidCache === 'success') {
        downloadsCacheBytes += bytesValid;
        successCount++;
        distributionCacheBytes += bytesValid;
      } else if (isValidCache === 'download') {
        needDownload.push(cache);
        needDownloadsCacheBytes += bytesValid;
        rejectCount++;
        distributionCacheBytes += bytesValid;
      }
    }

    const isSuccessDownload = await AsyncStorage.getItem('isSuccessDownload');

    dispatch(
      setCompare({
        compare: {
          successCount,
          rejectCount,
          distributionCacheBytes,
          downloadsCacheBytes,
          needDownloadsCacheBytes,
        },
        needDownload,
        freeSpace,
        isSuccessDownload: isSuccessDownload === 'true' ? true : false,
      }),
    );
  };

// Начать загрузку файлов
export const fetchStartDownload = (): AppThunk => async (dispatch, state) => {
  const { cdnCache } = state().distribution;
  const { rejectCount } = state().loader.compare;
  const { needDownload } = state().loader;
  const modeType = state().settings.modeType;

  let numberOfDownloads = 0; // Количество файлов скачали
  let downloadBytes = 0; // Сколько весят файлы которые скачали

  // Регистрация пуш
  dispatch(createPushNotificationLoader());

  // Инициализация пуш
  dispatch(
    onUploadTaskEventLoader({
      status: 'download',
      sizeFile: 0,
      currentFile: rejectCount,
      size: 0,
      current: rejectCount,
      file: '',
    }),
  );

  // Цикл загрузки файлов
  for await (const cache of needDownload) {
    const { id, path: toFile, name: toName, bytes } = cache;
    const bytesValid = bytes.length > 1 ? bytes[modeType] : bytes[0];
    const urlValid =
      bytes.length > 1 && modeType > 0 ? cdnCache + '_snow' : cdnCache;

    // Начало загрузки
    try {
      // Указываем какой файл качаем
      dispatch(
        setDownloadLoader({
          download: {
            fileName: toName,
            currentBytes: 0, // Сколько скачал
            needBytes: bytesValid, // Сколько нужно скачать
            numberOfDownloads, // Сколько нужно скачать
            downloadBytes,
          },
        }),
      );

      // Запрос к вдс для загрузки
      const res = await FileDownload.download({
        fromUrl: `${urlValid}/${toFile}/${toName}`,
        toFile,
        toName,
        progress: ({ bytesWritten }: DownloadProgressType) => {
          dispatch(
            setDownloadLoader({
              download: {
                currentBytes: bytesWritten,
                downloadBytes: downloadBytes + bytesWritten,
              },
            }),
          );
        },
      });

      // Файл найден - все гуд
      if (res.statusCode === 200) {
        numberOfDownloads++;
        downloadBytes += bytesValid;

        dispatch(
          onUploadTaskEventLoader({
            status: 'download',
            sizeFile: numberOfDownloads, // Какой по счету качает
            currentFile: rejectCount,
            size: numberOfDownloads,
            current: rejectCount,
            file: toName,
          }),
        );

        dispatch(
          setDownloadLoader({
            download: {
              numberOfDownloads: numberOfDownloads,
              downloadBytes: downloadBytes,
            },
          }),
        );
        dispatch(setCacheReject(id));
      }
    } catch (error) {
      dispatch(onUploadTaskEventLoader({ status: 'complete' }));
      return navigationRef.current?.dispatch(StackActions.replace('Error'));
    }
  }

  dispatch(onUploadTaskEventLoader({ status: 'complete' }));
  dispatch(fetchIsDownloadSuccess());
  return navigationRef.current?.dispatch(StackActions.replace('Main'));
};

// Сравнить файлы если изменены
export const nameFileRecursion = (): AppThunk => async (dispatch, state) => {
  const cacheMode = state().distribution.cacheMode;
  const gpuSystem = state().app.gpu;
  const modeType = state().settings.modeType;
  let needDownload = [0, 0];

  for await (const cache of cacheMode) {
    const { path, name, gpu: gpuCache } = cache;

    const isValid = await FileValidate.isValidGpu({ gpuCache, gpuSystem });
    if (isValid) {
      try {
        const res = await FileName.reversFiles(path, name, modeType);
        needDownload[modeType] += res[modeType];
      } catch (e) {}
    }
  }

  return needDownload[0] > 0;
};

export const fetchIsDownloadSuccess = (): AppThunk => async dispatch => {
  try {
    await AsyncStorage.setItem('isSuccessDownload', 'true');
    dispatch(setSuccessDownload({ isSuccessDownload: true }));
  } catch (error) {
    dispatch(setSuccessDownload({ isSuccessDownload: false }));
  }
};
