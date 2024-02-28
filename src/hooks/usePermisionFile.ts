import { setAlertProtectionFile } from '../actions/alertActions';
import { selectPermisionFileRead } from '../selectors/permisionSelectors';
import { fetchPermisions } from '../thunks/permisionThunks';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

export const usePermisionFile = (): {
  fetchPermision: () => boolean;
} => {
  const dispatch = useAppDispatch();
  const isPermision = useAppSelector(selectPermisionFileRead);

  const fetchPermision = (): boolean => {
    if (isPermision === 'denied') {
      dispatch(fetchPermisions());
      return false;
    } else if (isPermision === 'never_ask_again') {
      dispatch(setAlertProtectionFile(true));
      return false;
    }

    return true;
  };

  return { fetchPermision };
};
