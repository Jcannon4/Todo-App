import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { v6 as uuidv6 } from "uuid";
import trash from "../../assets/images/delete.png";
import circle from "../../assets/images/circle.png";
import check from "../../assets/images/check.png";
import { deleteTodo, toggleComplete } from "./todoSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { useRef, useState } from "react";

export interface TodoItemProps {
  id: string;
  msg: string;
  isComplete: boolean;
}

export function createTodo(text: string): TodoItemProps {
  const todoData: TodoItemProps = {
    id: uuidv6(),
    msg: text,
    isComplete: false,
  };
  return todoData;
}

const TodoItem = ({ msg, id, isComplete }: TodoItemProps) => {
  const spinAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const minimizeAnim = useRef(new Animated.Value(1)).current;
  const dispatch = useDispatch<AppDispatch>();

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const opacityAnim = useRef(new Animated.Value(1)).current;
  const [animation, setAnimation] = useState(false);

  const checkmarkAnimation = () => {
    // Animate spin + shrink
    Animated.sequence([
      Animated.parallel([
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(spinAnim, {
          toValue: -5,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Toggle state halfway through
    setTimeout(() => setAnimation(!animation), 200);
  };

  const deleteAnimation = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(minimizeAnim, {
          toValue: 0,
          duration: 200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  const toggleCompletion = (id: string, isComplete: boolean) => {
    console.log("Toggle Completion of item with id:\n" + id);
    dispatch(toggleComplete({ id, isComplete }));
    checkmarkAnimation();
  };

  const onDelete = (id: string, isComplete: boolean) => {
    deleteAnimation();
    setTimeout(() => dispatch(deleteTodo({ id, isComplete })), 200);
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: minimizeAnim }],
        },
      ]}
    >
      <Pressable
        onPress={() => toggleCompletion(id, isComplete)}
        style={styles.buttonContainer}
      >
        <Animated.Image
          source={isComplete ? check : circle}
          style={[
            styles.button,
            {
              transform: [{ scale: scaleAnim }, { rotate: spin }],
              opacity: opacityAnim,
              tintColor: isComplete ? "#00E676" : "#7A7A7A",
            },
          ]}
          resizeMode="contain"
        ></Animated.Image>
      </Pressable>
      <View style={styles.contentContainer}>
        <Text style={styles.content}>{msg}</Text>
      </View>

      <Pressable
        onPress={() => onDelete(id, isComplete)}
        style={styles.trashContainer}
      >
        <Animated.Image style={styles.trash} source={trash} />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1a1a1a",
    flexDirection: "row",
    borderRadius: 14,
    shadowRadius: 5,
    marginBottom: 20,
    paddingVertical: 14,
    paddingHorizontal: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    elevation: 4,
  },
  contentContainer: {
    flex: 5,
    textAlign: "left",
    justifyContent: "flex-start",
    alignContent: "center",
  },
  content: {
    fontSize: 16,
    color: "#E0E0E0",
    flexWrap: "wrap",
  },
  buttonContainer: {
    flex: 1,
    minWidth: 30,
  },
  button: {
    tintColor: "#00E676",
    height: 25,
    width: 25,
    transform: [{ rotate: "spin" }],
  },
  trashContainer: {
    flex: 1,
    minWidth: 20,
  },
  trash: {
    width: 40,
    height: 40,
    borderRadius: 50, // Example: make it circular
    borderColor: "transparent",
    borderWidth: 2,
    tintColor: "#FF5252",
    alignSelf: "flex-end",
  },
});

export default TodoItem;
