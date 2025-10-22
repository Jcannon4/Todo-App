import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
const AddButton = ({ ...props }) => {
  return (
    <Pressable {...props}>
      <AntDesign name="plus" size={props.buttonSize} color='white'/>
      {/* <Text style={styles.text}>+</Text> */}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 72,
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    //marginBottom: 24,
    // paddingBottom: "25%",
  },
});

export default AddButton;
