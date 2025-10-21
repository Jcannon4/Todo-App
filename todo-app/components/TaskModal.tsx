import React from "react";
import {
  Modal,
  StyleSheet,
  Pressable,
  Text,
  View,
  TextInput,
} from "react-native";
import RectangleButton from "./RectangleButton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { createTodo } from "@/app/todo/todoItem";
import { addTodo } from "@/app/todo/todoSlice";

const TaskModal = ({ ...props }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [text, onChangeText] = React.useState("");
  const closeModal = (isConfirm: boolean, data: string) => {
    onChangeText("");
    props.onClose(false);
    if (isConfirm) {
      const todoData = createTodo(data);
      console.log("Firing addTodo item to Store with metadata:\n" + data);
      dispatch(addTodo(todoData));
    }
  };
  return (
    <Pressable onPressOut={() => props.onClose(false)}>
      <Modal
        transparent
        onDismiss={() => props.onClose(false)}
        visible={props.isVisible}
        animationType="slide"
        onRequestClose={() => props.onClose(false)}
      >
        <Pressable
          style={styles.modalBackground}
          onPress={() => props.onClose(false)}
        >
          <Pressable style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter Data</Text>
            <TextInput
              style={styles.input}
              placeholder="Add a task."
              placeholderTextColor={"grey"}
              value={text}
              onChangeText={onChangeText}
            ></TextInput>
            <View style={styles.buttons}>
              <RectangleButton
                title="Cancel"
                backColor="grey"
                fontColor="white"
                onPress={() => closeModal(false, "")}
              ></RectangleButton>
              <RectangleButton
                title="Add Task"
                backColor="green"
                fontColor="white"
                onPress={() => closeModal(true, text)}
              ></RectangleButton>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,50,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    color: "#000",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default TaskModal;
