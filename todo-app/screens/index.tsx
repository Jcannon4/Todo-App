import { Link } from "expo-router";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="/todoList">Todo List</Link>
    </View>
  );
}

const style = StyleSheet.create({});
