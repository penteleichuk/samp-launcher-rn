import RNApkInstaller from '@dominicvonk/react-native-apk-installer';
import { APP_VERSION } from '@env';
import { StackActions } from '@react-navigation/native';
import RNFS from 'react-native-fs';
import { setDownloadLoader } from '../actions/loaderActions';
import {
  DownloadProgressType,
  FilePath,
  FileValidate,
} from '../features/fileManager';
import { navigationRef } from '../routers/RootNavigation';
import { AppThunk } from '../store/store';

const toPatch = FilePath.getPathDirLauncher();

export const installLauncher = (): AppThunk => async (_, state) => {
  const { name } = state().distribution.launcher;

  try {
    await RNApkInstaller.install(`${toPatch}/${name}`);
  } catch (e) {
    navigationRef.current?.dispatch(StackActions.replace('Error'));
  }
};

export type UpdateLauncherType = {
  setIsError: (value: boolean) => void;
  setIsFetchDownload: (value: boolean) => void;
};
export const updateLauncher =
  (props: UpdateLauncherType): AppThunk =>
  async (dispatch, state) => {
    const launcher = state().distribution.launcher;
    const cdnLauncher = state().distribution.cdnLauncher;

    dispatch(
      setDownloadLoader({
        download: {
          currentBytes: 0,
          needBytes: launcher.bytes,
        },
      }),
    );

    try {
      await RNFS.downloadFile({
        fromUrl: `${cdnLauncher}/${launcher.name}`,
        toFile: `${toPatch}/${launcher.name}`,
        progressInterval: 800,
        progress: (prog: DownloadProgressType) => {
          dispatch(
            setDownloadLoader({
              download: {
                currentBytes: prog.bytesWritten,
              },
            }),
          );
        },
      }).promise;

      return navigationRef.current?.dispatch(
        StackActions.replace('LauncherUpdateScreen'),
      );
    } catch (e) {
      props.setIsFetchDownload(false);
      props.setIsError(true);
    }
  };

export const autoUpdateLauncher = (): AppThunk => async (_, state) => {
  const appDistributionVersion = state().distribution.launcher.appVersion;

  if (appDistributionVersion > APP_VERSION) {
    const appDistributionName = state().distribution.launcher.name;
    const appDistributionHash = state().distribution.launcher.hash;

    try {
      const pathDownloadFile = `${toPatch}/${appDistributionName}`;

      const isDownloadLauncher = await FileValidate.isValidFileHash(
        pathDownloadFile,
        appDistributionHash,
      );

      if (isDownloadLauncher) {
        return navigationRef.current?.dispatch(
          StackActions.replace('LauncherUpdateScreen'),
        );
      } else {
        return navigationRef.current?.dispatch(
          StackActions.replace('LauncherDownloadScreen'),
        );
      }
    } catch (e) {}
  }

  return navigationRef.current?.dispatch(StackActions.replace('Main'));
};
