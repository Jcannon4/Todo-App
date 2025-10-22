import React from "react";
import { Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
const AddButton = ({ ...props }) => {
  return (
    <Pressable {...props}>
      <AntDesign name="plus" size={props.buttonSize} color='white'/>

    </Pressable>
  );
};


export default AddButton;
