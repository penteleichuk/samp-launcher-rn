import { PACKAGE_NAME, PROJECT_NAME } from '@env';
import notifee, { AndroidImportance } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { AppThunk } from '../store/store';

export const appRegisterDeviceForRemoteMessages = (): AppThunk => async () => {
  await notifee.requestPermission();
  await messaging().registerDeviceForRemoteMessages();

  return await notifee.createChannel({
    id: PACKAGE_NAME + '-default',
    name: PROJECT_NAME + ' Chanel',
    importance: AndroidImportance.HIGH,
  });
};

// Создать нотификацию
export const createPushNotificationLoader = (): AppThunk => async dispatch => {
  dispatch(onUploadTaskEventLoader({ status: 'cancel' }));

  return await notifee.createChannel({
    id: PACKAGE_NAME + '-notification',
    name: PROJECT_NAME + ' Chanel',
  });
};

// Обновление загрузки
export const onUploadTaskEventLoader =
  (event): AppThunk =>
  async () => {
    if (event.status === 'download') {
      await notifee.displayNotification({
        id: PACKAGE_NAME + '-notification',
        body: `${event.file} [${event.sizeFile} из ${event.currentFile}]`,
        title: 'Загрузка файлов игры...',
        android: {
          channelId: PACKAGE_NAME + '-notification',
          ongoing: true,
          onlyAlertOnce: true,
          showTimestamp: true,
          colorized: true,
          progress: {
            max: event.current,
            current: event.size,
          },
        },
      });
    }

    if (event.status === 'complete') {
      await notifee.displayNotification({
        id: PACKAGE_NAME + '-notification',
        body: ' ',
        title: 'Загрузка файлов завершена',
        android: {
          channelId: PACKAGE_NAME + '-notification',
          ongoing: true,
          onlyAlertOnce: false,
          showTimestamp: true,
          colorized: true,
          progress: {
            max: 100,
            current: 100,
          },
        },
      });
    }

    if (event.status === 'cancel') {
      await notifee.cancelNotification(PACKAGE_NAME + '-notification');
    }
  };
