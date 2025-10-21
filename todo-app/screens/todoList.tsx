import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native'
import AddUserButton from '../components/AddUserButton'
import TaskModal from '../components/TaskModal'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store/store';
import TodoItem, { TodoItemProps } from '../app/todo/todoItem';

export default function TodoList() {
  // Array of tofo items from the redux store
  const todoDataArray: TodoItemProps[] = useSelector((state: RootState) => state.todoItem.data);

  const [isVisible, setModalVisible] = React.useState(false);

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

      <View>
        <Text style={styles.line}>Completed Line</Text>
      </View>

      <AddUserButton
        onPress={() => setModalVisible(true)}
      />

      <TaskModal
        isVisible={isVisible}
        onClose={setModalVisible}
      />

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
  line: {
    fontSize: 24,
  }

})