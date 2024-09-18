import PushNotification from 'react-native-push-notification';

export const configNoti = () => {
  PushNotification.configure({
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
};

export const pushLocalNotificationSchedule = (time: number = 0, message: string) => {
  PushNotification.localNotificationSchedule({
    message: 'Time to complete: ' + message,
    date: new Date(Date.now() + time),
    allowWhileIdle: false,
  });
};

export const pushLocalNoti = (expireDate: string, message: string) => {
  const expiryDate = new Date(expireDate).getTime();
  const currentDate = Date.now();
  if (expiryDate > currentDate) {
    const time = expiryDate - currentDate;
    pushLocalNotificationSchedule(time, message);
  }
};

