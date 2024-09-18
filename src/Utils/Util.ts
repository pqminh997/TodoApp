import AsyncStorage from '@react-native-async-storage/async-storage';
import {IconType, TodoItem} from './Types';

const iconRedStar = require('../Assets/images/icon_red.png');
const iconOrangeStar = require('../Assets/images/icon_orange.png');
const iconYellowStar = require('../Assets/images/icon_yellow.png');
const iconStar = require('../Assets/images/icon_star.png');

const TODOS_KEY = 'todos';

export const convertText = (item: IconType) => {
  switch (item) {
    case 'all':
      return 'All';
    case 'none':
      return 'None';
    case 'red':
      return 'High';
    case 'yellow':
      return 'Low';
    case 'orange':
      return 'Medium';
    default:
      return 'None';
  }
};

export const getIcon = (icon: IconType, isAddView: boolean = false) => {
  switch (icon) {
    case 'all':
      return null;
    case 'red':
      return iconRedStar;
    case 'none':
      return isAddView ? iconStar : null;
    case 'yellow':
      return iconYellowStar;
    case 'orange':
      return iconOrangeStar;
    default:
      return null;
  }
};

export const loadTodos = async (): Promise<TodoItem[]> => {
  try {
    const todosJson = await AsyncStorage.getItem(TODOS_KEY);
    if (todosJson) {
      return JSON.parse(todosJson);
    }
    return [];
  } catch (error) {
    console.error('Failed to load todos from storage', error);
    return [];
  }
};

export const saveTodos = async (todos: TodoItem[]) => {
  try {
    const todosJson = JSON.stringify(todos);
    await AsyncStorage.setItem(TODOS_KEY, todosJson);
  } catch (error) {
    console.error('Failed to save todos to storage', error);
  }
};
