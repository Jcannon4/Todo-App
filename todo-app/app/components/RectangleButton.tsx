import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from "react-native"

const AddUserButton = ({ ...props }) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={[styles.button, {backgroundColor: props.backColor}]}>
            <Text
                style={{
                    color: props.fontColor,
                }}>{props.title}</Text>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    button: {
        width: 100,
        height: 50,
        borderRadius: 5, // Half of width/height to make it circular
        backgroundColor: '#007AFF', // Example background color
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AddUserButton;