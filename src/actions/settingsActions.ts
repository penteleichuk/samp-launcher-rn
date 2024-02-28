export const setSettings = (payload: {
  userName: string;
  serverid: number;
  fpsLimit: number;
  pageSize: number;
  graphic: number;
  fpscounter: number;
  androidKeyboard: number;
  localhost: number;
  skip: number;
}) =>
  ({
    type: 'SET_SETTINGS',
    payload: payload,
  } as const);

export const setSettingServer = (payload: {serverid: number}) =>
  ({
    type: 'SET_SETTING_SERVER',
    payload: payload,
  } as const);

export const setModeType = (value: number) =>
  ({
    type: 'SET_MODE_TYPE',
    payload: {
      modeType: value,
    },
  } as const);

export const setSettingFps = (payload: {fpsLimit: number}) =>
  ({
    type: 'SET_SETTING_FPS',
    payload: payload,
  } as const);

export const setSettingPageSize = (payload: {pageSize: number}) =>
  ({
    type: 'SET_SETTING_PAGE_SIZE',
    payload: payload,
  } as const);

export const setSettingGraphic = (payload: {graphic: number}) =>
  ({
    type: 'SET_SETTING_GRAPHIC',
    payload: payload,
  } as const);

export const setSettingFpsCounter = (payload: {fpscounter: number}) =>
  ({
    type: 'SET_SETTING_FPS_COUNTER',
    payload: payload,
  } as const);

export const setSettingKeyboard = (payload: {androidKeyboard: number}) =>
  ({
    type: 'SET_SETTING_KEYBOARD',
    payload: payload,
  } as const);

export const setUserNameSetting = (payload: {userName: string}) =>
  ({
    type: 'SET_USERNAME_SETTING',
    payload,
  } as const);

type setUserNameSettingActionType = ReturnType<typeof setUserNameSetting>;
type SetSettingServerActionType = ReturnType<typeof setSettingServer>;
type SetSettingActionType = ReturnType<typeof setSettings>;
type SetSettingFPSActionType = ReturnType<typeof setSettingFps>;
type SetSettingPageSizeActionType = ReturnType<typeof setSettingPageSize>;
type SetSettingGraphicActionType = ReturnType<typeof setSettingGraphic>;
type SetSettingFpsCounterActionType = ReturnType<typeof setSettingFpsCounter>;
type SetSettingKeyboardActionType = ReturnType<typeof setSettingKeyboard>;
type SetModeTypeActionType = ReturnType<typeof setModeType>;

export type SettingActionsType =
  | setUserNameSettingActionType
  | SetSettingActionType
  | SetSettingServerActionType
  | SetSettingFPSActionType
  | SetSettingPageSizeActionType
  | SetSettingGraphicActionType
  | SetSettingFpsCounterActionType
  | SetModeTypeActionType
  | SetSettingKeyboardActionType;
