import { Stack } from "expo-router";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { store } from "./store/store";
import { Provider } from "react-redux";
import "react-native-get-random-values";

export default function RootLayout() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({});
  }, [navigation]);
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#6a51ae" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Home",
          }}
        />

        <Stack.Screen
          name="todoList"
          options={({ route }) => ({
            title: (route.params as { title: string })?.title || "Todo List",
            // ... other options
          })}
        />
      </Stack>
    </Provider>
  );
}
