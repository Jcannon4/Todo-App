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
import { createTodo, TodoItemProps } from "@/app/todo/todoItem";
import { addTodo } from "@/app/todo/todoSlice";
import InputField from "./InputField";

const TaskModal = ({ ...props }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [inputs, setInputs] = React.useState<string[]>([""]);

  // Handles submission logic when user presses 'confirm'
  const onSubmit = (inputs: string[]) => {
    // Reset input fields after submission
    setInputs([""]);
    props.closeModal(false);
    const inputDataset: TodoItemProps[] = [];
    // Convert each user input string into a TodoItem object
    inputs.map((input) => {
      const dataPoint = createTodo(input);
      inputDataset.push(dataPoint);
      console.log("Creating TodoPropItem object with data:\n" + input);
    });
    // Dispatch action to update global state (handled in reducer)
    dispatch(addTodo(inputDataset));
  };
  // User has touched outside of modal, or pressed 'cancel' button
  // Closing modal and setting our inputs state to default
  const onClose = () => {
    setInputs([""]);
    props.closeModal(false);
  };
  // User has clicked the '+' button to add another inputField within the modal
  // Provides the user with another Input Field
  const handleAddInput = () => {
    setInputs([...inputs, ""]);
  };
  // Updates the correct inputfield the user is typing into
  const handleInputChange = (text: string, index: number) => {
    const newInputs = [...inputs];
    newInputs[index] = text;
    setInputs(newInputs);
  };
  return (
    <Pressable onPressOut={() => onClose()}>
      <Modal
        transparent
        onDismiss={() => onClose()}
        visible={props.isVisible}
        animationType="slide"
        onRequestClose={() => onClose()}
      >
        <Pressable style={styles.modalBackground} onPress={() => onClose()}>
          <Pressable style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter Data</Text>
            {inputs.map((input, index) => (
              <InputField
                key={index}
                placeholderTextColor="#C0C0C0"
                placeholder={`Input #${index + 1}`}
                value={input}
                mulitline={true}
                onChangeText={(text: string) => handleInputChange(text, index)}
              ></InputField>
            ))}
            <Pressable onPress={handleAddInput}>
              <Text style={styles.addInput}>++</Text>
            </Pressable>

            <View style={styles.buttons}>
              <RectangleButton
                title="Cancel"
                backColor="grey"
                fontColor="white"
                onPress={() => onClose()}
              ></RectangleButton>
              <RectangleButton
                title="Add Task"
                backColor="green"
                fontColor="white"
                onPress={() => onSubmit(inputs)}
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
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    height: 10000,
    fontSize: 36,
    marginBottom: 15,
    color: "#000",
  },
  addInputContainer: {},
  addInput: {
    fontSize: 12,
    color: "black",
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default TaskModal;
