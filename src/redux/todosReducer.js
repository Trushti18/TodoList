import {
  LOAD_TODOS,
  SET_TODOS,
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
  MARK_TODO_DONE,
  AUTO_DELETE_COMPLETED,
} from './todoActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = [];

const saveTodos = async todos => {
  try {
    await AsyncStorage.setItem('todos', JSON.stringify(todos));
  } catch (e) {
    console.error('Failed to save todos:', e);
  }
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TODOS:
      return action.payload;
    case ADD_TODO:
      const newTodosAdd = [...state, action.payload];
      saveTodos(newTodosAdd);
      return newTodosAdd;
    case EDIT_TODO:
      const newTodosEdit = state.map(todo =>
        todo.id === action.payload.id ? action.payload : todo,
      );
      saveTodos(newTodosEdit);
      return newTodosEdit;
    case DELETE_TODO:
      const newTodosDelete = state.filter(todo => todo.id !== action.payload);
      saveTodos(newTodosDelete);
      return newTodosDelete;
    case MARK_TODO_DONE:
      const newTodosMarkDone = state.map(todo =>
        todo.id === action.payload ? {...todo, done: !todo.done} : todo,
      );
      saveTodos(newTodosMarkDone);
      return newTodosMarkDone;
    case AUTO_DELETE_COMPLETED:
      const newTodosAutoDelete = state.filter(todo => !todo.done);
      saveTodos(newTodosAutoDelete);
      return newTodosAutoDelete;
    case LOAD_TODOS:
      return action.payload;
    default:
      return state;
  }
};

export default todosReducer;
