import { PACKAGE_NAME } from '@env';
import notifee, { EventType } from '@notifee/react-native';

export const onMessageReceived = async (message: any) => {
  await notifee.displayNotification({
    ...message.notification,
    android: {
      ...message.notification.android,
      channelId: PACKAGE_NAME + '-default',
    },
  });
};

export const onBackgroundEventReceived = async ({
  type,
  detail,
}: {
  type: any;
  detail: any;
}) => {
  const { notification, pressAction } = detail;

  if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
    await notifee.cancelNotification(notification.id);
  }
};
