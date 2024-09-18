/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import AppStack from './src/Navigations/AppStack';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import store, {setTodos} from './src/Store';
import {useAppDispatch} from './src/Store/hook';
import {configNoti} from './src/Utils/NotiServices';
import {loadTodos} from './src/Utils/Util';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RootComponent />
      </SafeAreaProvider>
    </Provider>
  );
};

const RootComponent = () => {
  const dispatch = useAppDispatch();
  configNoti();
  useEffect(() => {
    const fetchTodos = async () => {
      const getTodos = await loadTodos();
      if (getTodos) {
        dispatch(setTodos(getTodos));
      }
    };
    fetchTodos();
  });

  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default App;
