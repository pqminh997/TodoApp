import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

export const configNoti = () => {
  // Must be outside of any component LifeCycle (such as `componentDidMount`).
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);

      // process the notification

      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);

      // process the action
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      // badge: true,
      sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
  });
};

export const scheduleNotification = (daysFromNow: number) => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate());

  PushNotification.localNotificationSchedule({
    message: 'This is a scheduled notification!',
    date: futureDate,
    allowWhileIdle: true,
  });
};

export const pushLocalNotificationSchedule = (time: number = 0, message: string) => {
  PushNotification.localNotificationSchedule({
    //... You can use all the options from localNotifications
    message: 'Time to complete: ' + message, // (required)
    date: new Date(Date.now() + time),
    allowWhileIdle: false, // (optional) set notification to work while on doze, default: false

    /* Android Only Properties */
    repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
  });
};


export const sendLocalNotification = () => {
  PushNotificationIOS.addNotificationRequest({
    id: 'notificationWithSound',
    title: 'Sample Title',
    subtitle: 'Sample Subtitle',
    body: 'Sample local notification with custom sound',
    sound: 'customSound.wav',
    badge: 1,
  });
};

