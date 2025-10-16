import React from 'react';
import { TouchableOpacity } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';


const AddUserButton = ({ ...props }) => {
    return (
        <TouchableOpacity
            // onPress={() => consoleLog("presssssed")}
            {...props}
        >
            <AntDesign name="plus-circle" size={96} color="black" />
        </TouchableOpacity>
    )
}




export default AddUserButton;