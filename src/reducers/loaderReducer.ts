import { CacheType, LoaderActionsType } from '../actions/loaderActions';

export type CompareType = {
  successCount: number; // Успешно загруженных (сколько скачанных)
  rejectCount: number; // Ошибка в загрузке (сколько скачать)
  distributionCacheBytes: number; // Вес кеша (всех файлов)
  downloadsCacheBytes: number; // Вес сколько скачалось
  needDownloadsCacheBytes: number; // Вес сколько осталось скачать
  // needDownload: CacheType[]; // Массив файлов которые нужно скачать
};

export type DonwloadType = {
  fileName?: string; // Файл который скачиваем
  currentBytes?: number; // Сколько байт скачали (для каждого файла)
  needBytes?: number; // Сколько байт нужно скачать (для каждого файла)
  downloadBytes?: number; // Сколько всего байтов скачали
  numberOfDownloads?: number; // Сколько файлов скачал
};

const loaderInitState = {
  // Файлы которые скачал / нужно качать (При запуске лаунчера)
  compare: {
    successCount: 0,
    rejectCount: 0,
    distributionCacheBytes: 0,
    downloadsCacheBytes: 0,
    needDownloadsCacheBytes: 0,
    // needDownload: [] as CacheType[],
  } as CompareType,

  needDownload: [] as CacheType[],

  // Процесс загрузки кеша
  downalod: {
    fileName: '',
    currentBytes: 0,
    needBytes: 0,
    downloadBytes: 0,
    numberOfDownloads: 0,
  } as DonwloadType,

  // Сколько свободного памяти
  freeSpace: 0,

  // Если файлы игры загружены (первый скрин)
  isSuccessDownload: false,

  messageLauncher: '',
  actionLauncher: '',

  // Состояние загрузки ползунок
  loadingPercent: 0,
};

export type LoaderInitStateType = typeof loaderInitState;

export const loaderReducer = (
  state = loaderInitState,
  action: LoaderActionsType,
): LoaderInitStateType => {
  switch (action.type) {
    case 'SET_LAUNCHER_MESSAGE':
    case 'SET_LOADING_PERCEN':
    case 'SET_SUCCESS_DOWNLOAD': {
      return { ...state, ...action.payload };
    }
    case 'SET_COMPARE': {
      return {
        ...state,
        compare: {
          successCount: action.payload.compare.successCount || 0,
          rejectCount: action.payload.compare.rejectCount || 0,
          distributionCacheBytes:
            action.payload.compare.distributionCacheBytes || 0,
          downloadsCacheBytes: action.payload.compare.downloadsCacheBytes || 0,
          needDownloadsCacheBytes:
            action.payload.compare.needDownloadsCacheBytes || 0,
        },
        needDownload: action.payload.needDownload || [],
        freeSpace: action.payload.freeSpace || 0,
        isSuccessDownload: action.payload.isSuccessDownload,
      };
    }
    case 'SET_CACHE_REJECT': {
      return {
        ...state,
        needDownload: [
          ...state.needDownload.filter(el => el.id !== action.payload.id),
        ],
      };
    }
    case 'SET_DOWNLOAD_LOADER': {
      return {
        ...state,
        downalod: { ...state.downalod, ...action.payload.download },
      };
    }
    default: {
      return state;
    }
  }
};
