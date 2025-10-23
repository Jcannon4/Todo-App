import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import ListItem, { ListItemProps } from "@/app/list/listItem";
import { useSelector } from "react-redux";
import { RootState } from "../app/store/store";
import Animated, {
  LinearTransition,
  FadeInDown,
  FadeOutUp,
} from "react-native-reanimated";

const HomePageLists = () => {
  const listArray: ListItemProps[] = useSelector(
    (state: RootState) => state.lists.data,
  );

  return (
    <ScrollView
      style={styles.scrollContainer}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
    >
      {listArray.map((list) => (
        <Animated.View
          key={list.id}
          layout={LinearTransition}
          entering={FadeInDown.duration(200)}
          exiting={FadeOutUp.duration(200)}
        >
          <ListItem
            title={list.title}
            todoItems={list.todoItems}
            id={list.id}
            isComplete={list.isComplete}
            isArchived={list.isArchived}
          ></ListItem>
        </Animated.View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 3,
    paddingTop: "8%",
    width: "80%",
    minWidth: 300,
  },
});
export default HomePageLists;
