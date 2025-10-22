import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import AddButton from "../components/AddButton";
import Animated, {
  LinearTransition,
  FadeInDown,
  FadeOutUp,
} from "react-native-reanimated";
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
          <Animated.View
            key={item.id}
            layout={LinearTransition}
            entering={FadeInDown.duration(200)}
            exiting={FadeOutUp.duration(200)}
          >
            <TodoItem
              key={item.id}
              id={item.id}
              msg={item.msg}
              isComplete={item.isComplete}
            />
          </Animated.View>
        ))}
      </ScrollView>

      <AddButton buttonSize={32} style={styles.floatingButton} onPress={() => setModalVisible(true)} />
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
  floatingButton: {
    position: "absolute", // Makes the button float
    bottom: 20, // Position from the bottom
    right: 20, // Position from the right
    backgroundColor: "#007bff",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});
