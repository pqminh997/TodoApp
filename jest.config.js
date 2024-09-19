module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/react-native/extend-expect', './__mock__/mock.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native-calendars|react-native-swipe-gestures|@react-native|@react-native-async-storage/async-storage|@react-navigation/stack|react-native-push-notification|react-redux|uuid|@react-native-community/datetimepicker)/)',
  ],
};
