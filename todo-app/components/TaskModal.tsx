import React from "react";
import {
  Modal,
  StyleSheet,
  ScrollView,
  Pressable,
  Text,
  Keyboard,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import RectangleButton from "./RectangleButton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { createTodo, TodoItemProps } from "@/app/todo/todoItem";
import { addTodo } from "@/app/todo/todoSlice";
import InputField from "./InputField";
import AddButton from "./AddButton";
import Animated, {
  FadeInRight,
  LinearTransition,
} from "react-native-reanimated";

const TaskModal = ({ ...props }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [inputs, setInputs] = React.useState<string[]>([""]);
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
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
    setIsEdit(false);
  };
  // User has touched outside of modal, or pressed 'cancel' button
  // Closing modal and setting our inputs state to default
  const onClose = () => {
    setInputs([""]);
    props.closeModal(false);
    setIsEdit(false);
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
  // Do not close the modal when the user is editing a text input and clicks in the negative space
  const onbackgroundClose = () => {
    if (isEdit) {
      Keyboard.dismiss();
      setIsEdit(false);
    } else {
      props.closeModal(false);
    }
  };
  const handleFocus = () => {
    setIsEdit(true);
  };

  return (
    <View>
      <Modal
        transparent
        onDismiss={onClose}
        visible={props.isVisible}
        animationType="slide"
        onRequestClose={onClose}
      >
        <Pressable style={styles.modalBackground} onPress={onbackgroundClose}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.keyboardContainer}
          >
            <Animated.View
              layout={LinearTransition}
              style={styles.modalContainer}
            >
              <Pressable>
                <Text style={styles.modalTitle}>Enter Data</Text>

                <ScrollView
                  indicatorStyle="black"
                  showsVerticalScrollIndicator={true}
                  alwaysBounceVertical={true}
                  keyboardShouldPersistTaps="handled"
                  keyboardDismissMode="on-drag"
                  style={styles.scrollContainer}
                >
                  {inputs.map((input, index) => (
                    <Animated.View
                      key={index}
                      layout={LinearTransition}
                      entering={FadeInRight.duration(500)}
                    >
                      <InputField
                        key={index}
                        placeholderTextColor="#C0C0C0"
                        placeholder={`Task #${index + 1}`}
                        value={input}
                        onFocus={handleFocus}
                        mulitline={true}
                        onChangeText={(text: string) => {
                          handleInputChange(text, index);
                        }}
                      ></InputField>
                    </Animated.View>
                  ))}
                </ScrollView>
                <Animated.View layout={LinearTransition} style={styles.buttons}>
                  <RectangleButton
                    title="Cancel"
                    backColor="grey"
                    fontColor="white"
                    onPress={onClose}
                  ></RectangleButton>
                  <AddButton
                    onPress={handleAddInput}
                    style={styles.addButton}
                    buttonSize={18}
                  ></AddButton>

                  <RectangleButton
                    title="Add Task"
                    backColor="green"
                    fontColor="white"
                    onPress={() => onSubmit(inputs)}
                  ></RectangleButton>
                </Animated.View>
              </Pressable>
            </Animated.View>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,50,0,0.4)",
    justifyContent: "center",
    //paddingTop: 100,
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    maxHeight: "100%",
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
  keyboardContainer: {
    width: "100%",
    alignItems: "center",
  },
  scrollContainer: {
    maxHeight: 300,
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
    alignItems: "center",
  },
  addButton: {
    //flex: 1,
    backgroundColor: "#007bff",
    borderRadius: 30,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export default TaskModal;
