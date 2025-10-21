import React from "react";
import { StyleSheet, TextInput } from "react-native";

const InputField = ({ ...props }) => {
  const [text, onChangeText] = React.useState("");
  return (
    <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      value={text}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default InputField;
