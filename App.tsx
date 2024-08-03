import TodoList from './src/todoListScreen';
import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
}
