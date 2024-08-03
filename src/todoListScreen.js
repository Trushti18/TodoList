import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
} from 'react-native';
import {
  loadTodos,
  deleteTodo,
  markTodoDone,
  autoDeleteCompleted,
} from './redux/todoActions';
import TodoForm from './components/todoForm';
import TodoItem from './components/todoItem';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);
  const [editingTodo, setEditingTodo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(loadTodos());
    const interval = setInterval(() => {
      dispatch(autoDeleteCompleted());
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleEdit = todo => {
    setEditingTodo(todo);
  };

  const handleDelete = id => {
    dispatch(deleteTodo(id));
  };

  const handleDone = id => {
    dispatch(markTodoDone(id));
  };

  const handleCloseForm = () => {
    setEditingTodo(null);
  };

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchView}>
        <Image
          style={{height: 20, width: 20}}
          source={require('../assets/images/search.png')}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search tasks..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredTodos}
        renderItem={({item}) => (
          <TodoItem
            todo={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDone={handleDone}
          />
        )}
        keyExtractor={item => item.id}
      />
      <TodoForm todoToEdit={editingTodo} onClose={handleCloseForm} />
    </SafeAreaView>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    paddingHorizontal: 10,
  },
  searchInput: {
    paddingHorizontal: 10,
  },
});
