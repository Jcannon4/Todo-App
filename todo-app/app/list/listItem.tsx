import { v6 as uuidv6 } from "uuid";
import { StyleSheet, Pressable, Text } from "react-native";
import Animated from "react-native-reanimated";
import { initializeTodoState, TodoState } from "../todo/todoSlice";
import { AntDesign } from "@expo/vector-icons";
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
const changePage = (id: string, title: string) => {
  //Turn Off Menu
  console.log("chagne the webpage to \n" + title + ` with ID: ${id}`);
};

const ListItem = ({ title, id, isComplete, todoItems }: ListItemProps) => {
  return (
    <Pressable onPress={() => changePage(id, title)}>
      <Animated.View style={styles.container}>
        {/* <Animated.Image
          tintColor="#00E676"
          style={styles.checkmark}
          source={checkmark}
        ></Animated.Image> */}
        <Text style={styles.content}>{title}</Text>
        <AntDesign
          color="white"
          style={styles.options}
          name="right"
          size={28}
        ></AntDesign>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 14,
    marginBottom: 20,
    padding: 10,
    boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.3)",
  },

  checkmark: {
    height: 25,
    width: 25,
  },
  content: {
    flex: 5,
    textAlign: "left",
    justifyContent: "flex-start",
    alignContent: "center",
    color: "#E0E0E0",
    flexWrap: "wrap",
    marginLeft: 15,
  },
  options: {},
});

export default ListItem;
