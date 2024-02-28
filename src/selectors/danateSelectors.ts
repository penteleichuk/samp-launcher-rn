import { AppStoreType } from '../store/store';

export const selectDonates = (state: AppStoreType) => state.donate.donates;
