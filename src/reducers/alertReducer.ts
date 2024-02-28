import { AlertActionsType } from '../actions/alertActions';

const AlertInitState = {
  // Показать уведомление о доступе к файлам
  alertProtected: false,

  // Показать уведомление о доступе к микрофону
  alertProtectedSound: false,

  // Уведомление обновлении лаунчера
  alertUpdate: false,

  // Уведомление если не установлен ник
  alertUserName: false,

  // Уведомление что нужно скачать файлы
  alertUpadteMode: false,

  // Показать уведомление о памяти
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
