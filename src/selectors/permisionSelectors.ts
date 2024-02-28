import { AppStoreType } from '../store/store';

export const selectPermisionFileRead = (state: AppStoreType) =>
  state.permision.filesRead;
