import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import Animated, {
  FadeInDown,
  FadeOutUp,
  LinearTransition,
} from "react-native-reanimated";
import TodoItem from "@/app/todo/todoItem";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

interface TodoPageListProps {
  listID: string;
  todoInputsOrder: string[];
}

export default function TodoPageList(props: TodoPageListProps) {
  const list = useSelector(
    (state: RootState) => state.data.lists[props.listID], // Access the map of lists by ID
  );

  return (
    <ScrollView
      style={styles.scrollContainer}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
    >
      {props.todoInputsOrder.map((todoId: string) => {
        const todoItemsMap = list.todo.items;
        const todoItem = todoItemsMap[todoId];

        // Safety check: ensure the item exists in the map
        if (!todoItem) return null;

        return (
          <Animated.View
            key={todoId} // Key is the ID from the order array
            layout={LinearTransition}
            entering={FadeInDown.duration(200)}
            exiting={FadeOutUp.duration(200)}
          >
            <TodoItem
              // Pass the full data from the lookup
              todoId={todoItem.todoId}
              msg={todoItem.msg}
              isComplete={todoItem.isComplete}
            />
          </Animated.View>
        );
      })}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollContainer: {
    flex: 3,
    paddingTop: "8%",
    width: "90%",
    minWidth: 300,
  },
});
