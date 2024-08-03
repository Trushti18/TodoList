import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useDispatch} from 'react-redux';
import {addTodo} from './redux/todoActions';

const AddTodoForm = ({todoToEdit, onClose}) => {
  const [title, setTitle] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
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
  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDateTime(selectedDate);
    }
    if (Platform.OS !== 'ios') {
      setShowPicker(false);
    }
  };

  const handleSubmit = () => {
    if (title && dateTime) {
      const formattedDateTime = dateTime.toISOString();
      dispatch(
        addTodo({
          id: Date.now().toString(),
          title,
          dateTime: formattedDateTime,
          done: false,
        }),
      );
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
      {showPicker && (
        <DateTimePicker
          mode="datetime"
          value={dateTime}
          display="default"
          onChange={handleDateChange}
        />
      )}
      <TouchableOpacity onPress={handleSubmit} style={styles.addButton}>
        <Text style={styles.addText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
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

export default AddTodoForm;
