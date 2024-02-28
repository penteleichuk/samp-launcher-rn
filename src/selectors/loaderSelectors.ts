import { AppStoreType } from '../store/store';

export const selectRejectCount = (state: AppStoreType) =>
  state.loader.compare.rejectCount;

export const selectIsSuccessDownload = (state: AppStoreType) =>
  state.loader.isSuccessDownload;

export const selectCompare = (state: AppStoreType) => state.loader.compare;
export const selectLoaderDownload = (state: AppStoreType) =>
  state.loader.downalod;
export const selectFreeSpace = (state: AppStoreType) => state.loader.freeSpace;

export const selectBytes = (state: AppStoreType) => ({
  distributionCacheBytes: state.loader.compare.distributionCacheBytes,
  downloadsCacheBytes: state.loader.compare.downloadsCacheBytes,
});
