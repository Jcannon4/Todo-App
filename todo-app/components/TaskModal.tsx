import React, { createRef, useRef } from 'react';
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
  TextInput,
  LayoutChangeEvent,
} from 'react-native';
import RectangleButton from './RectangleButton';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store/store';
import { apiCreateList, apiCreateTodo } from '../api/services';
import InputField from './InputField';
import AddButton from './AddButton';
import Animated, {
  FadeInRight,
  LinearTransition,
} from 'react-native-reanimated';
import { UnknownAction } from '@reduxjs/toolkit';

interface TaskModalProps<T> {
  createPropObject: (text: string) => T;
  onSubmit: (payload: {
    lists?: T[];
    listId?: string;
    todos?: T[];
  }) => UnknownAction;
  closeModal: (visible: boolean) => void;
  reconciliateIDs: (payload: {
    responses: { tempId: string; realId: number; order: number }[];
  }) => UnknownAction;
  isVisible: boolean;
  isListMode: boolean; // true = List modal, false = Todo modal
  placeholder: string;
  title: string;
  confirmTitle: string;
  listID?: string;
}

export default function TaskModal<T>(props: TaskModalProps<T>) {
  const dispatch = useDispatch<AppDispatch>();
  const [inputs, setInputs] = React.useState<string[]>(['']);
  const [shouldFocusNewInput, setShouldFocusNewInput] = React.useState(false);
  const [isUserEditing, setIsUserEditing] = React.useState(false);
  // Create an reference to an array of TextInputs
  const inputRefs = React.useRef<(TextInput | null)[]>([]);
  const scrollRef = React.useRef<ScrollView | null>(null);
  // When The Task Modal renders, focus on the first textinput field

  // Places cursor into the new textfield for user
  // TODO: Make the Desktop version work with onMount rather than stinky timers
  React.useEffect(() => {
    if (!shouldFocusNewInput) return;
    // Fast Load for ios
    if (Platform.OS !== 'web') {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
      inputRefs.current[inputs.length - 1]?.focus();
    }
    // SLower rendering for desktop build
    else {
      const lastIndex = inputs.length - 1;
      setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 100);
      // small timeout to allow the new item to mount / layout
      setTimeout(() => {
        // simplest: scroll to end to make sure last input is visible
        // better strategies (measure and scroll to exact position) can be added later
        scrollRef.current?.scrollToEnd({ animated: true });
        inputRefs.current[lastIndex]?.focus();
        setShouldFocusNewInput(false); // we finished the "auto-focus" action
      }, 1020);
    }
  }, [inputs, shouldFocusNewInput]);

  // Handles submission logic when user presses 'confirm'
  const onSubmit = async (
    /* REMOVE 'async' when you get rid of asynchronous calls */ inputs: string[]
  ) => {
    // Reset input fields after submission
    setInputs(['']);
    props.closeModal(false);
    // #1 Create List of Objects with temporary uuids, agnostic for Lists & Todos
    const createdObjects = inputs
      .filter((i) => i.trim() !== '')
      .map((input) => props.createPropObject(input));

    // #2 Submit our user input of type TodoItemProps || ListItemProps to reducer
    if (props.isListMode) {
      // ListItemProps
      // #3 Update the reducer for instant UI feedback
      dispatch(props.onSubmit({ lists: createdObjects }));
      // #4 Send data to the Backend and await response
      const backendResponse = await apiCreateList(createdObjects);
      // #5 Use feedback from backend to update our front end UI
      dispatch(props.reconciliateIDs({ responses: backendResponse }));
    } else {
      //TodoListProps
      console.log('Dispatching todos');
      // Update the reducer for instant UI feedback
      dispatch(props.onSubmit({ listId: props.listID, todos: createdObjects }));
      const backendResponse = await apiCreateTodo(createdObjects, props.listID);
    }
    setIsUserEditing(false);
  };
  // User has touched outside of modal, or pressed 'cancel' button
  // Closing modal and setting our inputs state to default
  const onClose = () => {
    setInputs(['']);
    Keyboard.dismiss();
    props.closeModal(false);
    setIsUserEditing(false);
  };
  // User has clicked the '+' button to add another inputField within the modal
  // Provides the user with another Input Field
  const handleAddInput = () => {
    setInputs((prev) => [...prev, '']);
    setShouldFocusNewInput(true);
  };
  // Updates the correct inputfield the user is typing into
  const handleInputChange = (text: string, index: number) => {
    setInputs((prev) => {
      const next = [...prev];
      next[index] = text;
      return next;
    });
  };
  // Do not close the modal when the user is editing a text input and clicks in the negative space
  const onbackgroundClose = () => {
    if (isUserEditing) {
      Keyboard.dismiss();
      setIsUserEditing(false);
    } else {
      props.closeModal(false);
    }
  };
  const handleFocus = () => {
    setIsUserEditing(true);
    setShouldFocusNewInput(false); // prevent auto-focus override
  };

  return (
    <View>
      <Modal
        transparent
        onDismiss={onClose}
        visible={props.isVisible}
        animationType='slide'
        onRequestClose={onClose}
        onShow={() => inputRefs.current[0]?.focus()} // Focuses on first inputref for desktop
      >
        <Pressable style={styles.modalBackground} onPress={onbackgroundClose}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.keyboardContainer}
          >
            <Animated.View
              layout={LinearTransition}
              style={styles.modalContainer}
            >
              <Pressable>
                <Text style={styles.modalTitle}>{props.title}</Text>

                <ScrollView
                  ref={scrollRef}
                  indicatorStyle='black'
                  showsVerticalScrollIndicator={true}
                  alwaysBounceVertical={true}
                  keyboardShouldPersistTaps='handled'
                  keyboardDismissMode='on-drag'
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
                        placeholderTextColor='#C0C0C0'
                        placeholder={`${props.placeholder} #${index + 1}`}
                        value={input}
                        onFocus={handleFocus}
                        mulitline={true}
                        ref={(el: any) => {
                          inputRefs.current[index] = el;
                        }}
                        onChangeText={(text: string) => {
                          handleInputChange(text, index);
                        }}
                      ></InputField>
                    </Animated.View>
                  ))}
                </ScrollView>
                <Animated.View layout={LinearTransition} style={styles.buttons}>
                  <RectangleButton
                    title='Cancel'
                    backColor='grey'
                    fontColor='white'
                    onPress={onClose}
                  ></RectangleButton>
                  <AddButton
                    onPress={handleAddInput}
                    style={styles.addButton}
                    buttonSize={18}
                  ></AddButton>

                  <RectangleButton
                    title={props.confirmTitle}
                    backColor='green'
                    fontColor='white'
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
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,50,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    maxHeight: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  keyboardContainer: {
    width: '100%',
    alignItems: 'center',
  },
  scrollContainer: {
    maxHeight: 300,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    height: 10000,
    fontSize: 36,
    marginBottom: 15,
    color: '#000',
  },
  addInputContainer: {},
  addInput: {
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    //flex: 1,
    backgroundColor: '#007bff',
    borderRadius: 30,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, // Android shadow
    boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.3)',
  },
});
