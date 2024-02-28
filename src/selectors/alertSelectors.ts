import { AppStoreType } from '../store/store';

export const selectAlertFile = (state: AppStoreType) =>
  state.alert.alertProtected;

export const selectAlertSound = (state: AppStoreType) =>
  state.alert.alertProtectedSound;

export const selectAlertUserName = (state: AppStoreType) =>
  state.alert.alertUserName;

export const selectAlertUpdate = (state: AppStoreType) =>
  state.alert.alertUpdate;

export const selectAlertUpdateMode = (state: AppStoreType) =>
  state.alert.alertUpadteMode;

export const selectAlertSpace = (state: AppStoreType) => state.alert.alertSpace;
