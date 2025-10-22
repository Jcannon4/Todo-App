import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const AddUserButton = ({ ...props }) => {
  return (
    <TouchableOpacity
      style={styles.floatingButton}
      // onPress={() => consoleLog("presssssed")}
      {...props}
    >
      <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  text: {
    color: "white",
    fontSize: 60,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "25%",
  },
});

export default AddUserButton;
