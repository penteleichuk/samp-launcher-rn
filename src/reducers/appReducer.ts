import { AppActionsType } from '../actions/appActions';

const appInitState = {
  initial: false,

  isUpdate: false,

  selectedServer: -1,

  gpu: '',
};

export type AppStateType = typeof appInitState;

export const appReducer = (
  state = appInitState,
  action: AppActionsType,
): AppStateType => {
  switch (action.type) {
    case 'SET_IS_UPDATE_SCREEN':
    case 'SET_SELECT_SERVER':
    case 'SET_INITIAL':
    case 'SET_GPU':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
