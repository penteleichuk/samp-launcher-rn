import { DistributionActionsType } from '../actions/distributionActions';
import { DistributionResponse } from '../services/distribution.service';

const distributionInitState: DistributionResponse = {
  cdnLauncher: '',
  cdnCache: '',
  cacheMode: [],
  rss: '',
  versionHash: '',
  packageName: '',
  projectName: '',
  servers: [],
  launcher: {
    appVersion: '',
    name: '',
    hash: '',
    bytes: 0,
    size: '',
  },
  filesContinue: [],
};

export type DistributionStateType = typeof distributionInitState;

export const distributionReducer = (
  state = distributionInitState,
  action: DistributionActionsType,
): DistributionStateType => {
  switch (action.type) {
    case 'SET_DISTRIBUTION': {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
};
