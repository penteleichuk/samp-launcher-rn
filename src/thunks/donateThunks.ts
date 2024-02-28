import { setDonate } from '../actions/donateActions';
import { DonateService } from '../services/donate.service';
import { AppThunk } from '../store/store';

export const fetchDonates = (): AppThunk => async dispatch => {
  try {
    const res = await DonateService.get();
    dispatch(
      setDonate({
        donates: res[0],
        categories: res[1],
      }),
    );
  } catch (e) {}
};
