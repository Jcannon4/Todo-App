import Animated from "react-native-reanimated";
import { StyleSheet } from "react-native";
import MenuText from "./MenuText";
const OptionsMenu = ({ ...props }) => {
  const setMenu = (option: string) => {
    console.log("changing icon action selected is " + option);
    props.setListState(option);
  };
  return (
    <Animated.View style={styles.container}>
      <MenuText onSubmit={() => setMenu("delete")} msg="Delete lists" />
      <MenuText
        onSubmit={() => setMenu("edit")}
        msg="Edit list name"
        noBottomBorder={true}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6a51ae",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 14,
    width: 120,
    opacity: 0.8,
    position: "absolute",
    top: 50,
    right: 0,
  },
});

export default OptionsMenu;
