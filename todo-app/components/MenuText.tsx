import { StyleSheet, Text, Pressable } from "react-native";

const MenuText = ({ ...props }) => {
  return (
    <Pressable
      onPress={() => props.onSubmit()}
      style={[
        styles.container,
        {
          borderBottomWidth: props.noBottomBorder ? 0 : 2,
        },
      ]}
    >
      <Text style={styles.content}>{props.msg}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "white",
    padding: 8,
  },
  content: {
    fontSize: 12,
    color: "white",
    paddingLeft: 10,
    paddingTop: 5,
  },
});
export default MenuText;
