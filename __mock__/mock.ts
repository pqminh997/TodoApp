jest.mock('react-native-push-notification', () => ({
  configure: jest.fn(),
  onRegister: jest.fn(),
  onNotification: jest.fn(),
  addEventListener: jest.fn(),
  requestPermissions: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('../src/Utils/Util', () => ({
  ...jest.requireActual('../src/Utils/Util'),
  saveTodos: jest.fn(),
}));

jest.mock('../src/Utils/NotiServices', () => ({
  pushLocalNoti: jest.fn(),
}));
