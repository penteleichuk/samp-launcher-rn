import { AppStoreType } from '../store/store';

export const selectAppVersion = (state: AppStoreType) =>
  state.distribution.launcher.appVersion;

export const selectProjectName = (state: AppStoreType) =>
  state.distribution.projectName;

export const selectFilesContinue = (state: AppStoreType) =>
  state.distribution.filesContinue;
