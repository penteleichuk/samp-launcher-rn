import { setAlertNeedSpace } from '../actions/alertActions';
import { formatSizeUnits } from '../helpers';
import { selectBytes, selectFreeSpace } from '../selectors/loaderSelectors';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

export const useSpaceDownlload = (): {
  fetchSpace: () => boolean;
} => {
  const dispatch = useAppDispatch();
  const loader = useAppSelector(selectBytes);
  const freeSpace = useAppSelector(selectFreeSpace);

  const fetchSpace = () => {
    if (
      freeSpace <
      loader.distributionCacheBytes - loader.downloadsCacheBytes
    ) {
      dispatch(
        setAlertNeedSpace(true, {
          needSpace: +formatSizeUnits(
            loader.distributionCacheBytes - loader.downloadsCacheBytes,
          ),
          currentSpace: +formatSizeUnits(freeSpace),
        }),
      );

      return false;
    }

    return true;
  };

  return { fetchSpace };
};
