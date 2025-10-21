import React from "react";
import { StyleSheet, Pressable, Text } from "react-native";

const AddUserButton = ({ ...props }) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={[styles.button, { backgroundColor: props.backColor }]}
    >
      <Text
        style={{
          color: props.fontColor,
        }}
      >
        {props.title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 50,
    borderRadius: 5, // Half of width/height to make it circular
    backgroundColor: "#007AFF", // Example background color
    justifyContent: "center",
    alignItems: "center",
    elevation: 3, // For Android shadow
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddUserButton;
