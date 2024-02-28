import { APP_VERSION } from '@env';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { setAlertUpdatingMode } from '../actions/alertActions';
import {
  setSettingFps,
  setSettingFpsCounter,
  setSettingGraphic,
  setSettingKeyboard,
  setSettingPageSize,
  setUserNameSetting,
} from '../actions/settingsActions';
import { MainContainer, RangeLauncher, SwitchLauncher } from '../components';
import { AlertUpdateMode } from '../components/AlertScreen/AlertUpdateMode';
import { InputLauncher } from '../components/InputLauncher/InputLauncher';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { selectModeType, selectSettings } from '../selectors/settingSelectors';
import { nameFileRecursion } from '../thunks/loaderThunks';
import {
  fetchFPSSetting,
  fetchFpsSetting,
  fetchGraphicSetting,
  fetchKeyboardSetting,
  fetchModeSetting,
  fetchPageSizeSetting,
  fetchUserNameSetting,
} from '../thunks/settingsThunks';
import * as Icons from './../assets/svg';
import { styles } from './../styles/SettingsStyle';

export const SettingsScreen = React.memo(() => {
  const [isLoading, setIsLoading] = useState(false);

  const settings = useAppSelector(selectSettings);
  const settingMode = useAppSelector(selectModeType);
  const dispatch = useAppDispatch();

  // Конец редактирование текста
  const onEndEditingUserName = React.useCallback((value: string) => {
    dispatch(fetchUserNameSetting(value));
    dispatch(setUserNameSetting({ userName: value }));
  }, []);

  // Изменение значения
  const onValueChangeFps = React.useCallback((e: number) => {
    dispatch(setSettingFps({ fpsLimit: Math.floor(e) }));
  }, []);

  // Сохранение значений
  const onSlidingCompleteFps = React.useCallback((e: number) => {
    dispatch(fetchFpsSetting(Math.floor(e)));
  }, []);

  // Изменение значения
  const onValueChangePageSize = React.useCallback((e: number) => {
    dispatch(setSettingPageSize({ pageSize: Math.floor(e) }));
  }, []);

  // Сохранение значений
  const onSlidingCompletePageSize = React.useCallback((e: number) => {
    dispatch(fetchPageSizeSetting(Math.floor(e)));
  }, []);

  // Изменить мод
  const onValueChangeSnow = React.useCallback(async (value: boolean) => {
    setIsLoading(true);

    try {
      const res = await dispatch(nameFileRecursion());
      if (res) {
        dispatch(setAlertUpdatingMode(true));
      }
    } catch (e) {}
    dispatch(fetchModeSetting(value ? 1 : 0));

    setIsLoading(false);
  }, []);

  // Изменить графику
  const onValueChangeGraphic = React.useCallback((value: boolean) => {
    dispatch(setSettingGraphic({ graphic: value ? 1 : 0 }));
    dispatch(fetchGraphicSetting(value ? 1 : 0));
  }, []);

  // Изменить FPS
  const onValueChangeFPS = React.useCallback((value: boolean) => {
    dispatch(setSettingFpsCounter({ fpscounter: value ? 1 : 0 }));
    dispatch(fetchFPSSetting(value));
  }, []);

  // Изменить траву
  const onValueChangeKeyboard = React.useCallback((value: boolean) => {
    dispatch(setSettingKeyboard({ androidKeyboard: value ? 1 : 0 }));
    dispatch(fetchKeyboardSetting(value));
  }, []);

  return (
    <>
      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={'#228dff'} />
        </View>
      )}
      <MainContainer>
        <View style={styles.settingWrapper}>
          <View style={styles.setting}>
            <Text style={styles.title}>Настройки</Text>
          </View>
          <ScrollView>
            <View style={styles.body}>
              <View>
                <InputLauncher
                  Icon={Icons.UnionSvg}
                  title={'Ваш никнейм'}
                  value={settings.userName}
                  onChangeText={onEndEditingUserName}
                  placeholder={'Пример: Don_Corleone'}
                />
              </View>
              <View style={styles.switch}>
                <SwitchLauncher
                  onValueChange={onValueChangeSnow}
                  value={+settingMode}
                  title={'Зимняя карта'}
                />
                <SwitchLauncher
                  onValueChange={onValueChangeGraphic}
                  value={+settings.graphic}
                  title={'Улучшенная графика'}
                />
                <SwitchLauncher
                  onValueChange={onValueChangeFPS}
                  value={+settings.fpscounter}
                  title={'Счётчик FPS'}
                />
                <SwitchLauncher
                  onValueChange={onValueChangeKeyboard}
                  value={+settings.androidKeyboard}
                  title={'Android Keyboard'}
                />
              </View>
              <View style={styles.range}>
                <RangeLauncher
                  title={'FPS в игре'}
                  minimumValue={20}
                  maximumValue={60}
                  range={settings.fpsLimit}
                  onValueChange={onValueChangeFps}
                  onSlidingComplete={onSlidingCompleteFps}
                />
                <RangeLauncher
                  title={'Количество строк в чате'}
                  minimumValue={5}
                  maximumValue={20}
                  range={settings.pageSize}
                  onValueChange={onValueChangePageSize}
                  onSlidingComplete={onSlidingCompletePageSize}
                />
              </View>
            </View>
          </ScrollView>
          <Text style={styles.version}>Версия {APP_VERSION}</Text>
        </View>
      </MainContainer>
      <AlertUpdateMode />
    </>
  );
});
