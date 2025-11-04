import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, Pressable } from "react-native";
import AddButton from "../components/AddButton";
import TaskModal from "../components/TaskModal";
import { RootState, AppDispatch } from "../app/store/store";
import { createListState } from "@/app/list/listSlice";
import HomePageLists from "@/components/HomePageLists";
import { menuOff } from "../app/menu/menuSlice";
import { createListItemProps } from "@/app/list/listItem";

export default function Index() {
  const [isVisible, setVisibility] = React.useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const isMenuOpen: boolean = useSelector(
    (state: RootState) => state.menu.isOpen
  );
  const closingMenu = () => {
    console.log("Firing off press + " + isMenuOpen);
    dispatch(menuOff(false));
  };
  return (
    <View style={styles.container}>
      <HomePageLists />

      {isMenuOpen ? ( // Pressable renders when options menu renders,
        // This is so the menu options closes before user clicks on other items
        <Pressable
          style={[StyleSheet.absoluteFill, { zIndex: 10 }]}
          onPress={closingMenu}
        />
      ) : null}

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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#494D5F",
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
