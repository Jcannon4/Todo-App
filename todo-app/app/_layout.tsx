import { useNavigation } from '@react-navigation/native';
import { Stack } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { NativeModules } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-get-random-values';
import { Provider } from 'react-redux';
import { store } from './store/store';
const { BackendLauncher } = NativeModules;

export default function RootLayout() {
  const navigation = useNavigation();
  // Entry point for application. Launch our backend services
  // useEffect(() => {
  //   BackendLauncher.startServer();
  //   return () => {
  //     BackendLauncher.stopServer();
  //   };
  // }, []); //empty dependency array ensures single render during lifecycle
  useLayoutEffect(() => {
    navigation.setOptions({});
  }, [navigation]);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: '#6a51ae' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerTitleAlign: 'center',
          }}
        >
          <Stack.Screen
            name='index'
            options={{
              title: 'Home',
            }}
          />

          <Stack.Screen
            name='todoList'
            options={({ route }) => ({
              title: (route.params as { title: string })?.title || 'Todo List',
              // ... other options
            })}
          />
        </Stack>
      </Provider>
    </GestureHandlerRootView>
  );
}
