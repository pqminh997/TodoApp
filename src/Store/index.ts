import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, configureStore, PayloadAction} from '@reduxjs/toolkit';


export interface TodoItem {
  id: string;
  title: string;
  desc: string;
  createDate: number;
  expireDate: string;
  isSelected: boolean;
  icon: 'red' | 'yellow' | 'none' | 'orange' | 'all';
}

export interface TodoState {
  todos: TodoItem[];
}

const TODOS_KEY = 'todos';

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

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<TodoItem[]>) => {
      state.todos = action.payload;
    },
    addTodo: (state, action: PayloadAction<TodoItem>) => {
      state.todos.push(action.payload);
      saveTodos(state.todos);
    },
    deleteTodo: (state, action: PayloadAction<TodoItem>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
      saveTodos(state.todos);
    },
    editTodo: (state, action: PayloadAction<TodoItem>) => {
      const {id, title, desc, expireDate, icon} = action.payload;
      const todo = state.todos.find(item => item.id === id);
      if (todo) {
        todo.title = title;
        todo.desc = desc;
        todo.expireDate = expireDate;
        todo.icon = icon;
      }
      console.log('icon>>', icon);
      saveTodos(state.todos);
    },
    markAsCompleteTodo: (state, action: PayloadAction<TodoItem>) => {
      const todo = state.todos.find(item => item.id === action.payload.id);
      if (todo) {
        todo.isSelected = !todo.isSelected;
      }
      saveTodos(state.todos);
    },
  },
});

export const {
  addTodo,
  markAsCompleteTodo,
  deleteTodo,
  editTodo,
  setTodos,
} = todoSlice.actions;

const store = configureStore({
  reducer: todoSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
