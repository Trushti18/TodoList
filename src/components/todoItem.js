import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

const TodoItem = ({todo, onEdit, onDelete, onDone}) => {
  if (new Date(todo.dateTime) < new Date()) {
    onDelete(todo.id);
    return;
  }
  return (
    <View style={styles.container}>
      <View style={styles.todoDetails}>
        <Text style={todo.done ? styles.done : styles.title}>{todo.title}</Text>
        <Text style={styles.date}>
          {new Date(todo.dateTime).toLocaleString()}
        </Text>
      </View>
      <TouchableOpacity onPress={() => onDone(todo.id)} style={styles.button}>
        <Text style={styles.buttonText}>{todo.done ? 'Undo' : 'Done'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onEdit(todo)} style={styles.button}>
        <Image
          style={{height: 20, width: 20}}
          source={require('../../assets/images/edit.png')}
        />
        {/* <Text style={styles.buttonText}>Edit</Text> */}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(todo.id)} style={styles.button}>
        <Image
          style={{height: 20, width: 20}}
          source={require('../../assets/images/delete.png')}
        />
        {/* <Text style={styles.buttonText}>Delete</Text> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  todoDetails: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: 'black',
  },
  done: {
    fontSize: 18,
    textDecorationLine: 'line-through',
  },
  date: {
    color: '#999',
  },
  button: {
    padding: 10,
  },
  buttonText: {
    color: 'green',
  },
});

export default TodoItem;
