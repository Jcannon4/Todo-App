import React from "react";
import { Link } from "expo-router";
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
import { addList } from "@/app/list/listSlice";
import ListItem, { createList, ListItemProps } from "@/app/list/listItem";
// import TodoItem, { TodoItemProps } from "../app/todo/todoItem";

export default function Index() {
  const listArray: ListItemProps[] = useSelector(
    (state: RootState) => state.lists.data
  );
  const [isVisible, setVisibility] = React.useState<boolean>(false);
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {listArray.map((list) => (
          <Animated.View
            key={list.id}
            layout={LinearTransition}
            entering={FadeInDown.duration(200)}
            exiting={FadeOutUp.duration(200)}
          >
            <ListItem
              title={list.title}
              todoItems={list.todoItems}
              id={list.id}
              isComplete={list.isComplete}
              isArchived={list.isArchived}
            ></ListItem>
          </Animated.View>
        ))}
      </ScrollView>
      <Link href="/todoList">Todo List</Link>

      <AddButton
        buttonSize={32}
        style={styles.floatingButton}
        onPress={() => setVisibility(true)}
      />
      <TaskModal
        title="Create new list"
        placeholder="New List"
        confirmTitle="Create"
        onSubmit={addList}
        createPropObject={createList}
        isVisible={isVisible}
        closeModal={setVisibility}
      />
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
    boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.3)", // widht height radius (color code , opacity)
  },
});
