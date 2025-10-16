import { Stack } from "expo-router";
import { Pressable, Text } from "react-native";
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function RootLayout() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => alert("menu button has been pressed")}>
          <Text style={{ color: '#fff', fontSize: 16, paddingRight: 10 }}>Menu</Text>
        </Pressable>),
    });
  }, [navigation]);
  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: '#6a51ae' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
      headerTitleAlign: 'center',

    }}>
      <Stack.Screen name="index" options={{
        title: "Home",
        
        // headerRight: () => (
        //   <Pressable onPress={() => alert("menu button has been pressed")}>
        //     <Text style={{ color: '#fff', fontSize: 16, paddingRight: 10 }}>Menu</Text>
        //   </Pressable>
        // )

      }} />
      <Stack.Screen name="todoList" options={{
        title: 'Todo List'
      }} />
    </Stack>
  );
}
