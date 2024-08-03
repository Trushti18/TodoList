import {createStore, applyMiddleware} from 'redux';
import {combineReducers} from 'redux';
const thunkMiddleware = require('redux-thunk').thunk;
import todosReducer from './todosReducer';
let rootReducer = combineReducers({
  todos: todosReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
