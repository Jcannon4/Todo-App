import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ListItemProps, reorderLists } from '@/app/list/listSlice';
import ListItem from '@/app/list/listItem';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store/store';
import Animated, {
  LinearTransition,
  FadeInDown,
  FadeInUp,
  SlideOutLeft,
} from 'react-native-reanimated';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';

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
      <View>
        <ListItem
          title={item.title}
          _internal_uuid={item._internal_uuid}
          todo={item.todo}
          id={item.id}
          optionState={props.optionState}
          onLongPress={drag}
        />
      </View>
    ),
    [props.optionState]
  );
  /* -------------------------
     No Data Display
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
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    return (
      <Animated.View
        onLayout={() => LinearTransition.delay(100)}
        style={styles.scrollContainer}
      >
        <DraggableFlatList
          data={data}
          ListFooterComponent={<View style={styles.footer} />}
          keyExtractor={(item) => item._internal_uuid}
          onDragEnd={handleDragEndMobile}
          renderItem={renderItemDraggable}
          showsVerticalScrollIndicator={false}
          activationDistance={20} // how long to hold before drag starts
          itemEnteringAnimation={FadeInDown.duration(200)}
          // itemLayoutAnimation={LinearTransition}
          autoscrollSpeed={160}
          autoscrollThreshold={60}
          //enableLayoutAnimationExperimental={true}
          containerStyle={{ paddingBottom: 100 }}
        />
      </Animated.View>
      //  <DraggableFlatList data={data} onReorder={handleReorder}></DraggableFlatList>
    );
  }
  /* -------------------------
     WEB (Desktop): ScrollView
     ------------------------- */
  if (Platform.OS === 'web') {
    return (
      <ScrollView
        style={styles.scrollContainer}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {Object.values(listRecord).map((list) => (
          <Animated.View
            key={list._internal_uuid}
            style={{ marginTop: 10 }}
            layout={LinearTransition.delay(500)}
            entering={FadeInDown.duration(200)}
            exiting={SlideOutLeft.duration(500)}
          >
            <ListItem
              title={list.title}
              todo={list.todo}
              _internal_uuid={list._internal_uuid}
              id={list.id}
              optionState={props.optionState}
            ></ListItem>
          </Animated.View>
        ))}
        <View style={styles.footer} />
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 3,
    paddingTop: '8%',
    width: '95%',
    minWidth: 300,
    alignSelf: 'center',
  },
  itemContainer: {
    marginVertical: 6,
  },
  instruction: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 100,
  },
  // Allows user to scroll past the end to see last item clearly
  footer: {
    height: 100,
  },
});
export default HomePageLists;
