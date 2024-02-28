import RNGpuInfo from 'react-native-gpu-info';
import { setGPU, setInitial } from '../actions/appActions';
import { AppThunk } from '../store/store';
import { fetchArticles } from './articleThunks';
import { fetchDistribution } from './distributionThunks';
import { fetchDonates } from './donateThunks';
import { appRegisterDeviceForRemoteMessages } from './notificationThunks';
import { fetchPermisions } from './permisionThunks';
import { fetchInitialSettings } from './settingsThunks';

export const fetchInitialApp = (): AppThunk => async dispatch => {
  const glRenderer = RNGpuInfo.getGlRenderer();
  dispatch(setGPU(glRenderer));

  await dispatch(fetchPermisions());
  await dispatch(fetchInitialSettings());
  await dispatch(fetchDistribution());
  await dispatch(fetchArticles());
  await dispatch(fetchDonates());
  await dispatch(appRegisterDeviceForRemoteMessages());

  dispatch(setInitial({ initial: true }));
};
