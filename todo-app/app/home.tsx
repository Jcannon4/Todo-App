import React from "react";
import { View, Button, Text } from "react-native";
import AddUserButton from "./components/AddUserButton";
import InputField from "./InputField";
import consoleLog, { logWarn, logObject } from "./utils";

export default function Home() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text> User Login</Text>

            <Text>Edit app/index.tsx to edit this screen.</Text>
            <Button
                onPress={() => { consoleLog("Hello"); logWarn("Example warning"); logObject(true); }}
                title="Learn More"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
            <InputField placeholder='username' />
            <InputField placeholder='password' />
            <AddUserButton />


        </View>
    );
}