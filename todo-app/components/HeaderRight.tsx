import { Pressable } from "react-native";
import { RootState, AppDispatch } from "../app/store/store";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import OptionsMenu from "./OptionsMenu";
import { toggleMenu } from "../app/menu/menuSlice";

const HeaderRight = ({ ...props }) => {
  const isOpen: boolean = useSelector((state: RootState) => state.menu.isOpen);
  const dispatch = useDispatch<AppDispatch>();
  const activateMenu = () => {
    console.log(" Activating Menu otions on the home screen");
    dispatch(toggleMenu(!isOpen));
  };
  return (
    <Pressable onPress={activateMenu}>
      <AntDesign
        name="ellipsis"
        color="white"
        size={24}
        style={{ padding: 20 }}
      />
      {isOpen ? <OptionsMenu /> : null}
    </Pressable>
  );
};

export default HeaderRight;
