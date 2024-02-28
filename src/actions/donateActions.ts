import {DonateCategoriesType, DonateType} from '../services/donate.service';

export const setDonate = (payload: {
  donates: DonateType[];
  categories: DonateCategoriesType[];
}) => ({type: 'SET_DONATE', payload: payload} as const);

type SetDonateActionType = ReturnType<typeof setDonate>;

export type DonateActionsType = SetDonateActionType;
