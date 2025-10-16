import { Modal, Button, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import AddUserButton from './components/AddUserButton'
import RectangleButton from './components/RectangleButton'



export default function TodoList() {
  const [isVisible, setModalVisible] = React.useState(false);
  return (
    <View style={styles.container}>
      <Text>Todo List</Text>
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
                <TextInput style={styles.input}></TextInput>
                <View
                  style={styles.buttons}>
                  <RectangleButton
                    title='Cancel'
                    backColor="grey"
                    fontColor="white"
                    onPress={() => setModalVisible(false)}>

                  </RectangleButton>
                  <RectangleButton
                    title='Add Task'
                    backColor="green"
                    fontColor="white"
                    onPress={() => setModalVisible(false)}>
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