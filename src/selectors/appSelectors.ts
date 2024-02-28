import { AppStoreType } from '../store/store';

export const selectInitial = (state: AppStoreType) => state.app.initial;
export const selectGpu = (state: AppStoreType) => state.app.gpu;
export const selectSelectedServer = (state: AppStoreType) =>
  state.app.selectedServer;
