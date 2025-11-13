import React from "react";
import { StyleSheet, View, Pressable, Text, Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import AddButton from "../components/AddButton";
import TaskModal from "../components/TaskModal";
import { createListState } from "@/app/list/listSlice";
import HomePageLists from "@/components/HomePageLists";
import { createListItemProps } from "@/app/list/listItem";
import settingsIcon from "../assets/images/settings.png";

export default function Index() {
  const [isVisible, setVisibility] = React.useState<boolean>(false);

  const [optionState, setOptionState] = React.useState<boolean>(false);
  const toggleSettings = () => {
    console.log(" Settings have been pressed!!!");
    setOptionState(!optionState);
  };
  const AnimatedImage = Animated.createAnimatedComponent(Image);
  const AnimatedText = Animated.createAnimatedComponent(Text);
  const animationProgress = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const spinOutStyle = useAnimatedStyle(() => {
    const rotate = `${animationProgress.value * 360}deg`;

    // Interpolate scale from 1 (at 0 progress) down to 0.5 (at 1 progress)
    // The scale formula is: initial_size - (progress * size_change)
    const scale = 1 - animationProgress.value * 0.5;
    const opacity = 1 - animationProgress.value;
    return {
      transform: [{ rotate }, { scale }],
      opacity: opacity,
    };
  });
  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
    };
  });
  React.useEffect(() => {
    // Define the target values based on the state
    const imageTarget = optionState ? 1 : 0; // 1 for fully animated, 0 for initial
    const textTarget = optionState ? 1 : 0; // 1 for visible, 0 for hidden

    // --- ENTRANCE (optionState is true) ---
    if (optionState) {
      // 1. Image Spin and Shrink
      animationProgress.value = withTiming(
        imageTarget,
        {
          duration: 1000,
          easing: Easing.inOut(Easing.quad),
        },
        (isFinished) => {
          if (isFinished) {
            // 2. Text Fade In (run on the UI thread, but use runOnJS to start another animation)
            // We can just start the text animation directly after the image completes.
            textOpacity.value = withTiming(textTarget, { duration: 500 });
          }
        }
      );

      // --- EXIT (optionState is false) ---
    } else {
      // 1. Text Fade Out
      textOpacity.value = withTiming(
        textTarget,
        { duration: 500 },
        (isFinished) => {
          if (isFinished) {
            // 2. Image Spin Back and Grow
            animationProgress.value = withTiming(imageTarget, {
              duration: 1000,
              easing: Easing.inOut(Easing.quad),
            });
          }
        }
      );
    }
  }, [optionState]);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.welcome}>Welcome to the To-do List app</Text>
      </View>
      <HomePageLists optionState={optionState} />

      <AddButton
        buttonSize={32}
        style={styles.floatingButton}
        onPress={() => setVisibility(true)}
      />
      <TaskModal
        title="Create new list"
        placeholder="New List"
        confirmTitle="Create"
        onSubmit={createListState}
        createPropObject={createListItemProps}
        isVisible={isVisible}
        closeModal={setVisibility}
        isListMode={true}
      />
      <Pressable onPress={toggleSettings}>
        <AnimatedImage
          source={settingsIcon}
          style={[styles.settingsStyle, spinOutStyle]}
        ></AnimatedImage>
        <AnimatedText style={[styles.done, textAnimatedStyle]}>
          Done
        </AnimatedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#494D5F",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
  },
  welcome: {
    fontSize: 24,
    flex: 1,
    // To logically center the text itself within the flexible space it occupies
    textAlign: "center",
    color: "white",
  },
  settingsStyle: {
    position: "absolute", // Makes the button float
    bottom: 20, // Position from the bottom
    left: 20, // Position from the right
    width: 60,
    height: 60,
    // ...other image styles like width/height
  },
  done: {
    color: "white",
    //position: "absolute", // Makes the button float
    position: "absolute", // Makes the button float
    bottom: 20, // Position from the bottom
    left: 20, // Position from the right
    fontSize: 22,

    //Increasing a transparent border to make 'Done' more clickable
    borderRadius: 20,
    borderTopWidth: 20,
    borderBottomWidth: 20,
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: 'transparent',

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
