import {DistributionResponse} from '../services/distribution.service';

export const setDistribution = (payload: DistributionResponse) =>
  ({type: 'SET_DISTRIBUTION', payload: payload} as const);

export type SetDistributionActionType = ReturnType<typeof setDistribution>;

export type DistributionActionsType = SetDistributionActionType;
