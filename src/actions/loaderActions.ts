import { CompareType, DonwloadType } from '../reducers/loaderReducer';

export const setCompare = (payload: {
  compare: CompareType;
  needDownload: CacheType[];
  freeSpace: number;
  isSuccessDownload: boolean;
}) => ({ type: 'SET_COMPARE', payload } as const);

export const setSuccessDownload = (payload: { isSuccessDownload: boolean }) =>
  ({ type: 'SET_SUCCESS_DOWNLOAD', payload } as const);

export const setDownloadLoader = (payload: { download?: DonwloadType }) =>
  ({
    type: 'SET_DOWNLOAD_LOADER',
    payload,
  } as const);

export const setCacheReject = (value: number) =>
  ({ type: 'SET_CACHE_REJECT', payload: { id: value } } as const);

export const setLauncherMessage = (payload: {
  messageLauncher: string;
  actionLauncher: string;
}) => ({ type: 'SET_LAUNCHER_MESSAGE', payload } as const);

export const setLoadingPercent = (payload: { loadingPercent: number }) =>
  ({ type: 'SET_LOADING_PERCEN', payload } as const);

type SetCacheRejectActionType = ReturnType<typeof setCacheReject>;
type SetLauncherMessageActionType = ReturnType<typeof setLauncherMessage>;
type SetLoadingPercentActionType = ReturnType<typeof setLoadingPercent>;
type SetSuccessDownloadActionType = ReturnType<typeof setSuccessDownload>;
type SetCompareActionType = ReturnType<typeof setCompare>;
type SetDownloadLoaderActionType = ReturnType<typeof setDownloadLoader>;

export type LoaderActionsType =
  | SetCacheRejectActionType
  | SetLauncherMessageActionType
  | SetLoadingPercentActionType
  | SetSuccessDownloadActionType
  | SetCompareActionType
  | SetDownloadLoaderActionType;

export type CacheType = {
  id: number;
  name: string;
  path: string;
  bytes: number[];
  gpu: string;
};

export type LauncherType = {
  name: string;
  hash: string;
  bytes: number;
};
