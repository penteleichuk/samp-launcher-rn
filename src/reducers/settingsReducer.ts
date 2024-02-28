import { SettingActionsType } from '../actions/settingsActions';

export const settingInitState = {
  userName: '',
  serverid: -1,
  fpsLimit: 60,
  pageSize: 5,
  graphic: 0,
  voice: 0,
  fpscounter: 0,
  androidKeyboard: 0,
  localhost: 0,
  skip: 0,
  modeType: -1,
};

type SettingInitStateType = typeof settingInitState;

export const settingReducer = (
  state = settingInitState,
  action: SettingActionsType,
): SettingInitStateType => {
  switch (action.type) {
    case 'SET_SETTINGS':
    case 'SET_SETTING_SERVER':
    case 'SET_SETTING_FPS':
    case 'SET_SETTING_PAGE_SIZE':
    case 'SET_SETTING_GRAPHIC':
    case 'SET_SETTING_FPS_COUNTER':
    case 'SET_SETTING_KEYBOARD':
    case 'SET_MODE_TYPE':
    case 'SET_USERNAME_SETTING': {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};
