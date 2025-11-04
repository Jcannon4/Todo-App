import { ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import Animated, {
  FadeInDown,
  FadeOutUp,
  LinearTransition,
} from 'react-native-reanimated';
import TodoItem from '@/app/todo/todoItem';
import { TodoItemProps } from '@/app/list/listSlice';

interface TodoPageListProps {
  listID: string;
  todoInputs: Record<string, TodoItemProps>;
}

export default function TodoPageList(props: TodoPageListProps) {
  console.log(
    ' LIST ID : ' + props.listID + '\n todoInputs: ' + props.todoInputs
  );
  // Animations not updating since we are not directly tapped into the redux state here
  // const list = useSelector((state: RootState) =>
  //   state.lists.data.find((item) => item.id === listID)
  // );
  // const todoDataArray = list?.todoItems.data ?? [];

  return (
    <ScrollView
      style={styles.scrollContainer}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
    >
      {Object.values(props.todoInputs).map((item) => (
        <Animated.View
          key={item.id}
          layout={LinearTransition}
          entering={FadeInDown.duration(200)}
          exiting={FadeOutUp.duration(200)}
        >
          <TodoItem
            key={item.id}
            id={item.id}
            msg={item.msg}
            isComplete={item.isComplete}
          />
        </Animated.View>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollContainer: {
    flex: 3,
    paddingTop: '8%',
    width: '80%',
    minWidth: 300,
  },
});
