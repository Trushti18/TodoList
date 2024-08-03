import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useDispatch} from 'react-redux';
import {addTodo, editTodo} from '../redux/todoActions';

const TodoForm = ({todoToEdit, onClose}) => {
  const [title, setTitle] = useState('');
  const [dateTime, setDateTime] = useState();
  const [showPicker, setShowPicker] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (todoToEdit) {
      setTitle(todoToEdit.title);
      setDateTime(new Date(todoToEdit.dateTime));
      setIsEditing(true);
    } else {
      setTitle('');
      setDateTime(new Date());
      setIsEditing(false);
    }
  }, [todoToEdit]);

  const handleDateChange = selectedDate => {
    setShowPicker(false);
    setDateTime(selectedDate || dateTime);
  };

  const handleSubmit = () => {
    if (title && dateTime) {
      const formattedDateTime = dateTime.toISOString();
      if (isEditing) {
        dispatch(
          editTodo({
            id: todoToEdit.id,
            title,
            dateTime: formattedDateTime,
            done: todoToEdit.done,
          }),
        );
      } else {
        dispatch(
          addTodo({
            id: Date.now().toString(),
            title,
            dateTime: formattedDateTime,
            done: false,
          }),
        );
      }
      setTitle('');
      setDateTime('');
      onClose();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={styles.dateTimeButton}>
        <Text style={styles.dateTimeText}>
          {dateTime ? dateTime.toLocaleString() : 'Select Date and Time'}
        </Text>
      </TouchableOpacity>
      <DatePicker
        modal
        open={showPicker}
        date={new Date()}
        onConfirm={date => {
          handleDateChange(date);
        }}
        onCancel={() => {
          setShowPicker(false);
        }}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.addButton}>
        <Text style={styles.addText}>
          {isEditing ? 'Update Task' : 'Add Task'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  dateTimeButton: {
    height: 40,
    justifyContent: 'center',
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  dateTimeText: {
    fontSize: 16,
    color: 'black',
  },
  addButton: {
    backgroundColor: 'black',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
});

export default TodoForm;
