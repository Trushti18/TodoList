import AsyncStorage from '@react-native-async-storage/async-storage';

export const LOAD_TODOS = 'LOAD_TODOS';
export const SET_TODOS = 'SET_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const MARK_TODO_DONE = 'MARK_TODO_DONE';
export const AUTO_DELETE_COMPLETED = 'AUTO_DELETE_COMPLETED';

export const loadTodos = () => async dispatch => {
  try {
    const todos = await AsyncStorage.getItem('todos');
    dispatch({
      type: LOAD_TODOS,
      payload: todos ? JSON.parse(todos) : [],
    });
  } catch (e) {
    console.error('Failed to load todos:', e);
  }
};

export const setTodos = todos => ({
  type: SET_TODOS,
  payload: todos,
});

export const addTodo = todo => ({
  type: ADD_TODO,
  payload: todo,
});

export const editTodo = todo => ({
  type: EDIT_TODO,
  payload: todo,
});

export const deleteTodo = id => ({
  type: DELETE_TODO,
  payload: id,
});

export const markTodoDone = id => ({
  type: MARK_TODO_DONE,
  payload: id,
});

export const autoDeleteCompleted = () => ({
  type: AUTO_DELETE_COMPLETED,
});
