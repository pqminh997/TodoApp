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
  configNoti: jest.fn(),
}));

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: jest.fn(),
}));

jest.mock('../src/Store/hook', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({children}: {children: any}) => children,
  useSafeAreaInsets: () => ({top: 0, bottom: 0, left: 0, right: 0}),
  SafeAreaView: ({children}: {children: any}) => children,
}));

jest.mock('react-redux', () => ({
  Provider: ({children}: {children: any}) => children,
}));
