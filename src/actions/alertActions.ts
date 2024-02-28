export const setAlertProtectionFile = (value: boolean) =>
  ({
    type: 'SET_ALERT_PROTECTION_FILE',
    payload: {alertProtected: value},
  } as const);

export const setAlertProtectionSound = (value: boolean) =>
  ({
    type: 'SET_ALERT_PROTECTION_SOUND',
    payload: {
      alertProtectedSound: value,
    },
  } as const);

export const setAlertUpdating = (value: boolean) =>
  ({
    type: 'SET_ALERT_UPDATING',
    payload: {alertUpdate: value},
  } as const);

export const setAlertUpdatingMode = (value: boolean) =>
  ({
    type: 'SET_ALERT_UPDATING_MODE',
    payload: {alertUpadteMode: value},
  } as const);

export const setAlertUserName = (value: boolean) =>
  ({
    type: 'SET_ALERT_USER_NAME',
    payload: {alertUserName: value},
  } as const);

export const setAlertNeedSpace = (
  value: boolean,
  payload: {
    needSpace: number;
    currentSpace: number;
  },
) =>
  ({
    type: 'SET_ALERT_NEED_SPACE',
    payload: {
      alertSpace: {
        status: value,
        needSpace: payload.needSpace,
        currentSpace: payload.currentSpace,
      },
    },
  } as const);

type SetProtectionFileActionType = ReturnType<typeof setAlertProtectionFile>;
type SetProtectionSoundActionType = ReturnType<typeof setAlertProtectionSound>;
type SetUpdatingActionType = ReturnType<typeof setAlertUpdating>;
type SetUserNameActionType = ReturnType<typeof setAlertUserName>;
type SetNeedSpaceActionType = ReturnType<typeof setAlertNeedSpace>;
type SetUpdateingModeActionType = ReturnType<typeof setAlertUpdatingMode>;

export type AlertActionsType =
  | SetProtectionFileActionType
  | SetProtectionSoundActionType
  | SetUpdatingActionType
  | SetUserNameActionType
  | SetUpdateingModeActionType
  | SetNeedSpaceActionType;
