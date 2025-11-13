import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ListItemProps, reorderLists } from "@/app/list/listSlice";
import ListItem from "@/app/list/listItem";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store/store";
import Animated, {
  LinearTransition,
  FadeInDown,
  FadeOutUp,
  FadeInUp,
} from "react-native-reanimated";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";

const HomePageLists = ({ ...props }) => {
  const dispatch = useDispatch();
  const listRecord: Record<string, ListItemProps> = useSelector(
    (state: RootState) => state.data.lists
  );
  const listOrder: string[] = useSelector(
    (state: RootState) => state.data.order
  );
  const data = React.useMemo(
    () => listOrder.map((id) => listRecord[id]),
    [listOrder, listRecord]
  );
  const handleReorder = React.useCallback(
    (newOrder: string[]) => {
      dispatch(reorderLists(newOrder));
    },
    [dispatch]
  );

  const handleDragEndMobile = React.useCallback(
    ({ data }: { data: ListItemProps[] }) =>
      handleReorder(data.map((item) => item.id)),
    [handleReorder]
  );

  const renderItemDraggable = React.useCallback(
    ({ item, drag, isActive }: RenderItemParams<ListItemProps>) => (
      <Animated.View
        key={item.id}
        layout={LinearTransition}
        entering={FadeInDown.duration(200)}
        exiting={FadeOutUp.duration(500)}
        style={[
          styles.itemContainer,
          isActive && { opacity: 0.9, transform: [{ scale: 1.02 }] },
        ]}
      >
        <ListItem
          title={item.title}
          todo={item.todo}
          id={item.id}
          optionState={props.optionState}
          onLongPress={drag}
        />
      </Animated.View>
    ),
    [props.optionState]
  );
  /* -------------------------
     No Data Display instructions
     ------------------------- */
  if (data.length === 0) {
    return (
      <Animated.Text style={styles.instruction} entering={FadeInUp}>
        Use the + button in bottom right to Create a list!
      </Animated.Text>
    );
  }
  /* -------------------------
     Mobile (ios/Android): DraggableFlatlist
     ------------------------- */
  if (Platform.OS === "ios" || Platform.OS === "android") {
    return (
      <View style={styles.scrollContainer}>
        <DraggableFlatList
          data={data}
          ListFooterComponent={<View style={styles.footer} />}
          keyExtractor={(item) => item.id}
          onDragEnd={handleDragEndMobile}
          renderItem={renderItemDraggable}
          showsVerticalScrollIndicator={false}
          activationDistance={20} // how long to hold before drag starts
        />
      </View>
    );
  }
  /* -------------------------
     WEB (Desktop): ScrollView
     ------------------------- */
  if (Platform.OS === "web") {
    return (
      <ScrollView
        style={styles.scrollContainer}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {Object.values(listRecord).map((list) => (
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
              optionState={props.optionState}
            ></ListItem>
          </Animated.View>
        ))}
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 3,
    paddingTop: "8%",
    width: "80%",
    minWidth: 300,
    alignSelf: "center",
  },
  itemContainer: {
    marginVertical: 6,
  },
  instruction: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    paddingTop: 100,
  },
  // Allows user to scroll past the end to see last item clearly
  footer: {
    height: 100,
  },
});
export default HomePageLists;
