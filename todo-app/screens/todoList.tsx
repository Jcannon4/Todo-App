import React from 'react';
import { StyleSheet, View } from 'react-native';
import AddButton from '../components/AddButton';
import TaskModal from '../components/TaskModal';

import { addTodos, reconcileTodoId } from '@/app/list/listSlice';
import { createTodoItemProps } from '@/app/todo/todoItem';
import TodoPageList from '@/components/TodoPageList';

import { RootState } from '@/app/store/store';
import { useLocalSearchParams } from 'expo-router';
import { useSelector } from 'react-redux';

export default function TodoList() {
  // Array of tofo items from the redux store

  const [isVisible, setModalVisible] = React.useState(false);

  const { id, title } = useLocalSearchParams<{ id: string; title: string }>();

  // use id to select list from redux
  const listID = useSelector((state: RootState) => state.data.lists[id].id);
  const todoOrder = useSelector(
    (state: RootState) => state.data.lists[id].todo.order
  );
  console.log('ANNOUNCING listID at render of todo list page: ' + listID);

  return (
    <View style={styles.container}>
      <TodoPageList listID={listID} todoInputsOrder={todoOrder} />

      <AddButton
        buttonSize={32}
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      />
      <TaskModal
        title='Enter Data'
        placeholder='Task'
        confirmTitle='Confirm'
        createPropObject={createTodoItemProps}
        onSubmit={addTodos}
        reconciliateIDs={reconcileTodoId}
        isVisible={isVisible}
        closeModal={setModalVisible}
        isListMode={false}
        listID={listID}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#494D5F',
  },

  floatingButton: {
    position: 'absolute', // Makes the button float
    bottom: 20, // Position from the bottom
    right: 20, // Position from the right
    backgroundColor: '#007bff',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, // Android shadow
    boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.3)',
  },
});
