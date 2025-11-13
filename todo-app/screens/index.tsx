import React from "react";
import {
  Animated,
  StyleSheet,
  View,
  Pressable,
  Text,
} from "react-native";
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
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.welcome}>Welcome to the To-do List app</Text>
        <Pressable onPress={toggleSettings}>
          {optionState === false ? (
            <Animated.Image
              style={styles.settingsStyle}
              source={settingsIcon}
            ></Animated.Image>
          ) : (
            <Text style={styles.done}>Done</Text>
          )}
        </Pressable>
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
    marginRight: 20,
    marginTop: 0,
    // ...other image styles like width/height
  },
  done: {
    color: "white",
    fontSize: 18,
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
