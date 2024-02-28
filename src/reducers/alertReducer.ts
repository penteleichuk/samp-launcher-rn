import { AlertActionsType } from '../actions/alertActions';

const AlertInitState = {
  alertProtected: false,

  alertProtectedSound: false,

  alertUpdate: false,

  alertUserName: false,

  alertUpadteMode: false,

  alertSpace: {
    status: false,
    needSpace: 0,
    currentSpace: 0,
  },
};

export type AlertStateType = typeof AlertInitState;

export const alertReducer = (
  state = AlertInitState,
  action: AlertActionsType,
): AlertStateType => {
  switch (action.type) {
    case 'SET_ALERT_NEED_SPACE':
    case 'SET_ALERT_USER_NAME':
    case 'SET_ALERT_UPDATING':
    case 'SET_ALERT_UPDATING_MODE':
    case 'SET_ALERT_PROTECTION_FILE':
    case 'SET_ALERT_PROTECTION_SOUND': {
      return { ...state, ...action.payload };
    }
    default: {
      return { ...state };
    }
  }
};
