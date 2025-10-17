import { Animated, Easing, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { v6 as uuidv6 } from 'uuid';
import trash from '../../assets/images/delete.png';
import circle from '../../assets/images/circle.png';
import { deleteTodo, toggleComplete } from './todoSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';

export interface TodoItemProps {
    id: string,
    msg: string;
    isComplete: boolean,
}

export function createTodo(text: string): TodoItemProps {
    const todoData: TodoItemProps = {
        id: uuidv6(),
        msg: text,
        isComplete: false,
    }
    return todoData;
}


const TodoItem = ({ msg, id, isComplete }: TodoItemProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const toggleCompletion = (id: string) => {
        console.log("Toggle Completion of item with id:\n" + id);
        dispatch(toggleComplete(id));
    };

    const onDelete = (id: string) => {
        dispatch(deleteTodo(id));
    };
    return (
        <View style={styles.container}>
            <Pressable onPress={() => toggleCompletion(id)} style={styles.buttonContainer}>
                <Image style={styles.button} source={circle}></Image>
            </Pressable>
            <Text style={styles.content}>{msg}</Text>
            <Pressable onPress={() => onDelete(id)} style={styles.trashContainer}>
                <Image style={styles.trash} source={trash} />
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1a1a1a',
        flexDirection: 'row',
        //width: '100%',
        borderRadius: 14,
        shadowRadius: 5,
        marginBottom: 20,
        paddingVertical: 14,
        paddingHorizontal: 18,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        elevation: 4,
        flexWrap: 'wrap'
    },
    content: {
        textAlign: 'left',
        justifyContent: 'flex-start',
        //alignContent: 'center',
        fontSize: 16,
        color: '#E0E0E0',
        flex: 5,
        maxWidth: '80%',
        //flexWrap: 'wrap'
    },
    buttonContainer: {
        flex: 1,
        minWidth: 30,
    },
    button: {
        tintColor: '#00E676',
        height: 25,
        width: 25,
    },
    trashContainer: {
        flex: 2,
        minWidth: 20
    },
    trash: {
        width: 40,
        height: 40,
        borderRadius: 50, // Example: make it circular
        borderColor: 'transparent',
        borderWidth: 2,
        tintColor: '#FF5252',
        alignSelf: 'flex-end',

    }

})

export default TodoItem;