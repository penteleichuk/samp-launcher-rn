import { DonateActionsType } from '../actions/donateActions';
import { DonateCategoriesType, DonateType } from '../services/donate.service';

const donateInitState = {
  donates: [] as DonateType[],
  categories: [] as DonateCategoriesType[],
};

export type DonateStateType = typeof donateInitState;

export const donateReducer = (
  state = donateInitState,
  action: DonateActionsType,
): DonateStateType => {
  switch (action.type) {
    case 'SET_DONATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
