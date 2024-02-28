import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import { setModeType, setSettings } from '../actions/settingsActions';
import { FilePath } from '../features/fileManager';
import { parseINIString, stringifyIni } from '../helpers';
import { AppThunk } from '../store/store';

type SettingType = {
  client: {
    name: string;
  };
  gui: {
    fps: number;
    ChatMaxMessages: number;
    fpscounter: number;
    androidKeyboard: number;
    graphic: number;
  };
  server: {
    serverid: number;
  };
  launcher: {
    localhost: number;
    skip: number;
  };
};

const toPatch = FilePath.getPathDirSetting();

export const fetchInitialSettings = (): AppThunk => async dispatch => {
  try {
    const res = await RNFS.readFile(toPatch, 'utf8');
    let resParse = parseINIString(res) as SettingType;

    const name = resParse.client?.name ?? '';
    const fps = resParse.gui?.fps ?? 40;
    const chat = resParse.gui?.ChatMaxMessages ?? 6;
    const fpscounter = resParse.gui?.fpscounter ?? 0;
    const androidKeyboard = resParse.gui?.androidKeyboard ?? 0;

    const serverid = resParse.server?.serverid ?? -1;
    const graphic = resParse.gui?.graphic ?? 0;

    const localhost = resParse.launcher?.localhost ?? 0;
    const skip = resParse.launcher?.skip ?? 0;

    dispatch(
      setSettings({
        userName: name,
        fpsLimit: fps,
        serverid: serverid,
        pageSize: chat,
        graphic: graphic,
        fpscounter: fpscounter,
        androidKeyboard: androidKeyboard,
        localhost,
        skip,
      }),
    );
  } catch (errors) {}
};

export const fetchUserNameSetting =
  (userName: string): AppThunk =>
  async () => {
    try {
      const res = await RNFS.readFile(toPatch, 'utf8');
      let resParse = parseINIString(res) as { client: { name: string } };

      resParse = {
        ...resParse,
        client: { ...resParse.client, name: userName },
      };

      await RNFS.writeFile(toPatch, stringifyIni(resParse), 'utf8');
    } catch (error) {}
  };

export const fetchFpsSetting =
  (value: number): AppThunk =>
  async () => {
    try {
      const res = await RNFS.readFile(toPatch, 'utf8');
      let resParse = parseINIString(res) as { gui: { fps: number } };

      resParse = { ...resParse, gui: { ...resParse.gui, fps: value } };

      await RNFS.writeFile(toPatch, stringifyIni(resParse), 'utf8');
    } catch (error) {}
  };

export const fetchPageSizeSetting =
  (value: number): AppThunk =>
  async () => {
    try {
      const res = await RNFS.readFile(toPatch, 'utf8');
      let resParse = parseINIString(res) as {
        gui: { ChatMaxMessages: number };
      };

      resParse = {
        ...resParse,
        gui: { ...resParse.gui, ChatMaxMessages: value },
      };

      await RNFS.writeFile(toPatch, stringifyIni(resParse), 'utf8');
    } catch (error) {}
  };

export const fetchGraphicSetting =
  (value: number): AppThunk =>
  async () => {
    try {
      const res = await RNFS.readFile(toPatch, 'utf8');
      let resParse = parseINIString(res) as { gui: { graphic: number } };

      resParse = {
        ...resParse,
        gui: { ...resParse.gui, graphic: value ? 1 : 0 },
      };

      await RNFS.writeFile(toPatch, stringifyIni(resParse), 'utf8');
    } catch (error) {}
  };

export const fetchFPSSetting =
  (value: boolean): AppThunk =>
  async () => {
    try {
      const res = await RNFS.readFile(toPatch, 'utf8');
      let resParse = parseINIString(res) as { gui: { fpscounter: number } };

      resParse = {
        ...resParse,
        gui: { ...resParse.gui, fpscounter: value ? 1 : 0 },
      };

      await RNFS.writeFile(toPatch, stringifyIni(resParse), 'utf8');
    } catch (error) {}
  };

export const fetchKeyboardSetting =
  (value: boolean): AppThunk =>
  async () => {
    try {
      const res = await RNFS.readFile(toPatch, 'utf8');
      let resParse = parseINIString(res) as {
        gui: { androidKeyboard: number };
      };

      resParse = {
        ...resParse,
        gui: { ...resParse.gui, androidKeyboard: value ? 1 : 0 },
      };

      await RNFS.writeFile(toPatch, stringifyIni(resParse), 'utf8');
    } catch (error) {}
  };

export const fetchServerIdSetting =
  (value: number): AppThunk =>
  async () => {
    try {
      const res = await RNFS.readFile(toPatch, 'utf8');
      let resParse = parseINIString(res) as { server: { serverid: number } };

      resParse = {
        ...resParse,
        server: { ...resParse.server, serverid: value ? 1 : 0 },
      };

      await RNFS.writeFile(toPatch, stringifyIni(resParse), 'utf8');
    } catch (error) {}
  };

export const fetchModeSetting =
  (value: number): AppThunk =>
  async dispatch => {
    try {
      await AsyncStorage.setItem('modeType', `${value}`);
      dispatch(setModeType(value));
    } catch (error) {
      dispatch(setModeType(0));
    }
  };

export const fetchModeInverseSetting =
  (): AppThunk => async (dispatch, state) => {
    const value = state().settings.modeType ? 0 : 1;

    try {
      await AsyncStorage.setItem('modeType', `${value}`);
      dispatch(setModeType(value));
    } catch (error) {
      dispatch(setModeType(0));
    }
  };
