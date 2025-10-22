import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import AddUserButton from "../components/AddUserButton";
import TaskModal from "../components/TaskModal";
import { useSelector } from "react-redux";
import { RootState } from "../app/store/store";
import TodoItem, { TodoItemProps } from "../app/todo/todoItem";

export default function TodoList() {
  // Array of tofo items from the redux store
  const todoDataArray: TodoItemProps[] = useSelector(
    (state: RootState) => state.todoItem.data
  );

  const [isVisible, setModalVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {todoDataArray.map((item) => (
          <TodoItem
            key={item.id}
            id={item.id}
            msg={item.msg}
            isComplete={item.isComplete}
          />
        ))}
      </ScrollView>

      <AddUserButton onPress={() => setModalVisible(true)} />
      <TaskModal isVisible={isVisible} closeModal={setModalVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#494D5F",
  },
  scrollContainer: {
    flex: 3,
    paddingTop: "8%",
    width: "80%",
    minWidth: 300,
  },
});
