import { StackActions } from '@react-navigation/native';
import { setDistribution } from '../actions/distributionActions';
import { navigationRef } from '../routers/RootNavigation';
import { DistributionService } from '../services/distribution.service';
import { AppThunk } from '../store/store';
import { compareFileRecursion } from './loaderThunks';

// Получить файлы настроек со сервера
export const fetchDistribution = (): AppThunk => async (dispatch, state) => {
  try {
    const { cache: caches, ...res } = await DistributionService.get();
    await dispatch(setDistribution(res));
    // Иницизализация файлов
    if (!state().settings.skip) {
      await dispatch(compareFileRecursion({ caches }));
    }
  } catch (error: any) {
    console.log(error);
    return navigationRef.current?.dispatch(StackActions.replace('Error'));
  }
};
