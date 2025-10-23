import { v6 as uuidv6 } from "uuid";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { TodoItemProps } from "../todo/todoItem";
import { initializeTodoState, TodoState } from "../todo/todoSlice";
export interface ListItemProps {
  title: string;
  id: string;
  isArchived: boolean;
  isComplete: boolean;
  todoItems: TodoState;
}
// Creates List objects for us to store into the state
// returns to the task modal before being shipped to the reducer
export function createList(text: string): ListItemProps {
  const listData: ListItemProps = {
    id: uuidv6(),
    title: text,
    isComplete: false,
    isArchived: false,
    todoItems: initializeTodoState(),
  };
  return listData;
}

const ListItem = ({ title, id, isComplete, todoItems }: ListItemProps) => {
  return <Text style={{ fontSize: 12 }}>{title}</Text>;
};

export default ListItem;
