import store, {addTodo, deleteTodo, editTodo, setTodos} from '../src/Store';
import {TodoItem} from '../src/Utils/Types';
import * as Util from '../src/Utils/Util';
import * as NotiServices from '../src/Utils/NotiServices';

// Reset all mocks before each test
beforeEach(() => {
  jest.resetAllMocks();
});

describe('convertText function', () => {
  it('returns "All" for input "all"', () => {
    expect(Util.convertText('all')).toBe('All');
  });
});

describe('addTodo action', () => {
  it('should add a new todo to the state and call saveTodos', async () => {
    const todo: TodoItem = {
      id: '1',
      title: 'Test Todo',
      desc: 'Description for test todo',
      expireDate: (Date.now() + 10000).toString(),
      icon: 'none',
      isDone: false,
      createDate: Date.now(),
    };

    // Dispatch addTodo action
    store.dispatch(addTodo(todo));

    // Check if the todo was added to the state
    const state = store.getState();
    expect(state.todos).toContainEqual(todo);

    // Check if saveTodos was called
    expect(Util.saveTodos).toHaveBeenCalled();

    // Check if pushLocalNoti was called with the correct parameters
    expect(NotiServices.pushLocalNoti).toHaveBeenCalledWith(
      todo.expireDate,
      todo.title,
    );
  });

  it('should not call pushLocalNoti if expireDate is not provided', () => {
    const todoWithoutExpireDate: TodoItem = {
      id: '2',
      title: 'No Expire Todo',
      desc: 'This todo has no expire date',
      expireDate: undefined,
      icon: 'none',
      isDone: false,
      createDate: Date.now(),
    };

    // Dispatch addTodo action
    store.dispatch(addTodo(todoWithoutExpireDate));

    // Check if the todo was added to the state
    const state = store.getState();
    expect(state.todos).toContainEqual(todoWithoutExpireDate);

    // Check if saveTodos was called
    expect(Util.saveTodos).toHaveBeenCalled();

    // Check that pushLocalNoti was not called if expireDate is not provided
    expect(NotiServices.pushLocalNoti).not.toHaveBeenCalled();
  });
});

describe('delete todo action', () => {
  it('delete todo', () => {
    const todoToDelete: TodoItem = {
      id: '1',
      title: 'Test Todo',
      desc: 'Test Description',
      createDate: Date.now(),
      isDone: false,
      icon: 'none',
    };

    store.dispatch(deleteTodo(todoToDelete));

    const state = store.getState();
    expect(state.todos).not.toContainEqual(todoToDelete);
    expect(Util.saveTodos).toHaveBeenCalled();
  });
});

describe('edit todo action', () => {
  it('should edit todo without changing id and createDate', () => {
    const existingTodo: TodoItem = {
      id: '1',
      title: 'Test Todo',
      desc: 'Test Description',
      createDate: Date.now(),
      isDone: false,
      icon: 'none',
    };

    const updatedTodo: TodoItem = {
      ...existingTodo,
      title: 'Updated Test Todo',
      desc: 'Updated Test Description',
      isDone: true,
    };

    store.dispatch(setTodos([existingTodo]));
    store.dispatch(editTodo(updatedTodo));

    const state = store.getState();

    // Check if the todo was updated
    expect(state.todos).toContainEqual({
      ...updatedTodo,
      id: existingTodo.id, // id should not change
      createDate: existingTodo.createDate, // createDate should not change
    });
    expect(Util.saveTodos).toHaveBeenCalled();
  });
});
