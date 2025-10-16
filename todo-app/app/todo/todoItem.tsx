import { Text, View } from 'react-native';
import { v6 as uuidv6 } from 'uuid';
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

const TodoItem = ({ msg }: TodoItemProps) => {
    return (
        <View>
            <Text>{msg}</Text>
        </View>
    )
};

export default TodoItem;