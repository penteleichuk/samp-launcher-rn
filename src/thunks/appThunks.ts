import RNGpuInfo from 'react-native-gpu-info';
import { setGPU, setInitial } from '../actions/appActions';
import { AppThunk } from '../store/store';
import { fetchArticles } from './articleThunks';
import { fetchDistribution } from './distributionThunks';
import { fetchDonates } from './donateThunks';
import { appRegisterDeviceForRemoteMessages } from './notificationThunks';
import { fetchPermisions } from './permisionThunks';
import { fetchInitialSettings } from './settingsThunks';

// Инициализация приложения
export const fetchInitialApp = (): AppThunk => async dispatch => {
  const glRenderer = RNGpuInfo.getGlRenderer();
  dispatch(setGPU(glRenderer));

  // Проава на загрузку / чтение
  await dispatch(fetchPermisions());

  // Загрузка настроек
  await dispatch(fetchInitialSettings());

  // Загрузка файлов
  await dispatch(fetchDistribution());

  // Загрузка новостей
  await dispatch(fetchArticles());

  // Загрузка доната
  await dispatch(fetchDonates());

  // Нотификации
  await dispatch(appRegisterDeviceForRemoteMessages());

  // Инициализация
  dispatch(setInitial({ initial: true }));
};
