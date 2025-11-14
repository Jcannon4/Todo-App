import React from "react";
import { StyleSheet, TextInput } from "react-native";

const InputField = ({ ...props }) => {
  return (
    <TextInput
      style={styles.input}
      keyboardAppearance="dark"
      clearButtonMode="while-editing"
      value={props.text}
      ref={props.ref}
      onLayout={props.onLayout}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 12,
    fontSize: 32,
    //borderColor: "#ccc",
    borderRadius: 8,
    alignItems: "center",
    padding: 10,
  },
});

export default InputField;
