import { ScrollView, StyleSheet, Text } from "react-native";
import React from "react";
import { ListItemProps } from "@/app/list/listSlice";
import ListItem from "@/app/list/listItem";
import { useSelector } from "react-redux";
import { RootState } from "../app/store/store";
import Animated, {
  LinearTransition,
  FadeInDown,
  FadeOutUp,
} from "react-native-reanimated";

const HomePageLists = ({ ...props }) => {
  const listRecord: Record<string, ListItemProps> = useSelector(
    (state: RootState) => state.data.lists,
  );

  return (
    <ScrollView
      style={styles.scrollContainer}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
    >
      {Object.keys(listRecord).length > 0 ? ( // Check that there is list data if not then provide message to user
        Object.values(listRecord).map((list) => (
          <Animated.View
            key={list.id}
            layout={LinearTransition}
            entering={FadeInDown.duration(200)}
            exiting={FadeOutUp.duration(500)}
          >
            <ListItem
              title={list.title}
              todo={list.todo}
              id={list.id}
              isComplete={list.isComplete}
              isArchived={list.isArchived}
              optionState={props.optionState}
            ></ListItem>
          </Animated.View>
        ))
      ) : (
        // No list data, instruct user to use the '+' button
        <Text style={styles.instruction}>
          Use the + button in bottom right to Create a list!
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 3,
    paddingTop: "8%",
    width: "80%",
    minWidth: 300,
    alignSelf: "center",
  },
  instruction: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    paddingTop: 100,
  },
});
export default HomePageLists;
