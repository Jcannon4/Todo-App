import React from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View, FlatList } from 'react-native'
import AddUserButton from '../components/AddUserButton'
import RectangleButton from '../components/RectangleButton'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo } from '../app/todo/todoSlice';
import { RootState, AppDispatch } from '../app/store/store';
import TodoItem, { createTodo, TodoItemProps } from '../app/todo/todoItem';

export default function TodoList() {
  const dispatch = useDispatch<AppDispatch>();

  // Array of tofo items from the redux store
  const todoDataArray: TodoItemProps[] = useSelector((state: RootState) => state.todoItem.data);
  const [isVisible, setModalVisible] = React.useState(false);
  const [text, onChangeText] = React.useState('');
  const closeModal = (isConfirm: boolean, data: string) => {
    onChangeText('');
    setModalVisible(false);
    if (isConfirm) {
      const todoData = createTodo(data);
      console.log("Firing addTodo item to Store with metadata:\n" + data);
      dispatch(addTodo(todoData));
    }

  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlist}
        data={todoDataArray}
        renderItem={({ item }) =>
          <TodoItem
            id={item.id}
            isComplete={item.isComplete}
            msg={item.msg} />
        }
        keyExtractor={item => item.id}
      />
      <AddUserButton
        onPress={() => setModalVisible(true)}
      />
      <View>

      </View>
      <Pressable onPressOut={() => setModalVisible(false)}>

        <Modal
          transparent
          onDismiss={() => setModalVisible(false)}
          visible={isVisible}
          animationType='slide'
          onRequestClose={() => setModalVisible(false)}>
          <Pressable style={styles.modalBackground} onPress={() => setModalVisible(false)}>
            <Pressable style={styles.modalContainer}>
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
            </Pressable>
          </Pressable>
        </Modal>
      </Pressable>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#494D5F'
  },
  flatlist: {
    paddingTop: '8%',
    width: '80%',
    minWidth: 300
  },
  button: {
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
    backgroundColor: 'rgba(0,50,0,0.4)',
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