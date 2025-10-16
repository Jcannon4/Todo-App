import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, FlatList } from 'react-native'
import AddUserButton from '../components/AddUserButton'
import RectangleButton from '../components/RectangleButton'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo } from '../app/todo/todoSlice';
import { RootState, AppDispatch } from '../app/store/store';
import TodoItem, { createTodo } from '../app/todo/todoItem';

export default function TodoList() {
  const dispatch = useDispatch<AppDispatch>();
  const texts = useSelector((state: RootState) => state.list.texts);
  const showText = useSelector((state: RootState) => state.list.showText);

  // Array of tofo items from the redux store
  const todoDataArray: TodoItem[] = useSelector((state: RootState) => state.todoItem.data);
  const [isVisible, setModalVisible] = React.useState(false);
  const [text, onChangeText] = React.useState('');
  const closeModal = (isConfirm: boolean, data: string) => {
    onChangeText('');
    setModalVisible(false);
    if (isConfirm) {
      const todoData = createTodo(data);
      console.log("Firing addTodo item to Store with metadata\n" + data);
      dispatch(addTodo(todoData));
    }

  }

  return (
    <View style={styles.container}>
      <Text>Todo List</Text>
      <ScrollView contentContainerStyle={styles.container}>
        {texts.map((text, idx) => (
          <Text key={idx} style={styles.text}>{text}</Text>
        ))}
      </ScrollView>
      <FlatList
        data={todoDataArray}
        renderItem={({ item }) => <Text>{item.msg}</Text>}
        keyExtractor={item => item.id}
      />
      {showText && <Text style={styles.text}>Hello from Redux!</Text>}
      <AddUserButton
        onPress={() => setModalVisible(true)}
      />
      <View>

      </View>
      <Modal
        transparent
        onDismiss={() => setModalVisible(false)}
        visible={isVisible}
        animationType='slide'
        onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback
          onPressOut={() => setModalVisible(false)}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Enter Data</Text>
                <TextInput style={styles.input}
                  placeholder='Add a task.'
                  placeholderTextColor={'grey'}
                  value={text}
                  onChangeText={onChangeText}
                ></TextInput>
                <View
                  style={styles.buttons}>
                  <RectangleButton
                    title='Cancel'
                    backColor="grey"
                    fontColor="white"
                    onPress={() => closeModal(false, '')}>

                  </RectangleButton>
                  <RectangleButton
                    title='Add Task'
                    backColor="green"
                    fontColor="white"
                    onPress={() => closeModal(true, text)}>
                  </RectangleButton>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }, button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    color: '#000',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  modalButton: {
    flex: 1,
    //paddingVertical: 10,
    borderRadius: 8,
    borderColor: 'black',
    //marginHorizontal: 5,
    width: 100,
    height: 1000,
    paddingVertical: 0,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  dataBox: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#e8f0fe',
    borderRadius: 10,
    borderColor: '#007AFF',
    borderWidth: 1,
    width: '80%',
    alignItems: 'center',
  },
  dataText: {
    fontSize: 16,
    color: '#333',
  },
})