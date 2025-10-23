import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import Animated, {
  FadeInDown,
  FadeOutUp,
  LinearTransition,
} from "react-native-reanimated";
import TodoItem from "@/app/todo/todoItem";
import { useSelector } from "react-redux";
import { RootState } from "../app/store/store";
import { TodoItemProps } from "@/app/todo/todoItem";
const TodoPageList = () => {
  const todoDataArray: TodoItemProps[] = useSelector(
    (state: RootState) => state.todoItem.data
  );
  return (
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
  );
};
const styles = StyleSheet.create({
  scrollContainer: {
    flex: 3,
    paddingTop: "8%",
    width: "80%",
    minWidth: 300,
  },
});

export default TodoPageList;
