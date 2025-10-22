import React from "react";
import { StyleSheet, TextInput } from "react-native";

const InputField = ({ ...props }) => {
  const [text, onChangeText] = React.useState("");
  return (
    <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      value={text}
      // multiline={true}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
   // height: 80,
    margin: 12,
    fontSize: 32,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
});

export default InputField;
