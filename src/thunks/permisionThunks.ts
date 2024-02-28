import { PermissionsAndroid } from 'react-native';
import { setPermisions } from '../actions/permisionActions';
import { AppThunk } from '../store/store';

// Запросить подтверждение на права
export const fetchPermisions = (): AppThunk => async dispatch => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);

    const getPermisions = {
      filesWrite: granted['android.permission.WRITE_EXTERNAL_STORAGE'],
      filesRead: granted['android.permission.READ_EXTERNAL_STORAGE'],
      microphone: granted['android.permission.RECORD_AUDIO'],
    };

    dispatch(setPermisions({ ...getPermisions }));
    return getPermisions;
  } catch (err) {}

  return {
    filesWrite: 'denied',
    filesRead: 'denied',
    microphone: 'denied',
  };
};
