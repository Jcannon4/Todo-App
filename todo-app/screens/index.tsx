import AddUserButton from "../components/AddButton";
import { Link } from "expo-router";
import InputField from "../components/InputField";
import consoleLog, { logWarn, logObject } from "../app/utils";
import { View, Button } from "react-native";
import QuickVerticalAnimation from "@/components/QuickVerticalAnimation";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Button
        onPress={() => {
          consoleLog("Hello");
          logWarn("Example warning");
          logObject(true);
        }}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <InputField placeholder="username" />
      <InputField placeholder="password" />
      <AddUserButton /> */}
      {/* <QuickVerticalAnimation/> */}
      <Link href="/todoList">Todo List</Link>
    </View>
  );
}
