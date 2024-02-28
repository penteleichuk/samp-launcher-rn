import { AppStoreType } from '../store/store';

export const selectSettingLocalhost = (state: AppStoreType) =>
  state.settings.localhost;

export const selectUserName = (state: AppStoreType) => state.settings.userName;
export const selectIsSkip = (state: AppStoreType) => state.settings.skip;
export const selectSettings = (state: AppStoreType) => state.settings;
export const selectModeType = (state: AppStoreType) => state.settings.modeType;
