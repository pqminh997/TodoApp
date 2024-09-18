import {createSlice, configureStore, PayloadAction} from '@reduxjs/toolkit';
import {TodoItem, TodoState} from '../Utils/Types';
import {pushLocalNoti} from '../Utils/NotiServices';
import {saveTodos} from '../Utils/Util';

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
      const {expireDate, title} = action.payload;
      state.todos.push(action.payload);
      saveTodos(state.todos);
      if (expireDate) {
        pushLocalNoti(expireDate, title);
      }
    },
    deleteTodo: (state, action: PayloadAction<TodoItem>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
      saveTodos(state.todos);
    },
    editTodo: (state, action: PayloadAction<TodoItem>) => {
      const {id, title, desc, expireDate, icon, isDone} = action.payload;
      const todo = state.todos.find(item => item.id === id);
      if (todo) {
        todo.title = title;
        todo.desc = desc;
        todo.expireDate = expireDate;
        todo.icon = icon;
        todo.isDone = isDone;
      }
      saveTodos(state.todos);
    },
  },
});

export const {addTodo, deleteTodo, editTodo, setTodos} = todoSlice.actions;

const store = configureStore({
  reducer: todoSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
