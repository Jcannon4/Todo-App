import { v6 as uuidv6 } from 'uuid'
export default interface TodoItem {
    id: string,
    msg: string;
    isComplete: boolean,
}

export function createTodo(text: string): TodoItem {
    const todoData: TodoItem = {
        id: uuidv6(),
        msg: text,
        isComplete: false,
    }
    return todoData;
}