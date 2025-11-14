import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import Animated, {
  Layout,
  FadeInDown,
  FadeOutUp,
} from "react-native-reanimated";
import DraggableItem from "./DraggableItem";

interface Props<T> {
  data: T[];
  keyExtractor: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;
  itemHeight: number;
  onReorder: (newOrderIds: string[]) => void;
}

export function ReorderableList<T>({
  data,
  keyExtractor,
  renderItem,
  itemHeight,
  onReorder,
}: Props<T>) {
  const positions = React.useRef(
    data.map((_, index) => index * itemHeight)
  ).current;

  const order = React.useRef(data.map(keyExtractor)).current;

  const forceRender = React.useState(0)[1]; // hack to re-render

  const dragId = React.useRef<string | null>(null);

  const onDragStart = (id: string) => {
    dragId.current = id;
  };

  const onDrag = (id: string, translationY: number) => {
    const from = order.indexOf(id);
    const absoluteY = from * itemHeight + translationY;

    const to = Math.floor(absoluteY / itemHeight);

    if (to < 0 || to >= order.length) return;

    if (to !== from) {
      const newOrder = [...order];
      const moved = newOrder.splice(from, 1)[0];
      newOrder.splice(to, 0, moved);
      order.splice(0, order.length, ...newOrder);
      forceRender((v) => v + 1);
    }
  };

  const onDragEnd = () => {
    dragId.current = null;
    onReorder([...order]);
  };

  return (
    <FlatList
      data={order.map((id) => data.find((d) => keyExtractor(d) === id)!)}
      keyExtractor={keyExtractor}
      renderItem={({ item, index }) => (
        <Animated.View
          layout={Layout.springify()}
          entering={FadeInDown}
          exiting={FadeOutUp}
          style={{ height: itemHeight }}
        >
          <DraggableItem
            id={keyExtractor(item)}
            index={index}
            itemHeight={itemHeight}
            // onDragStart={onDragStart}
            //onDrag={onDrag}
            onDragEnd={onDragEnd}
          >
            {renderItem(item)}
          </DraggableItem>
        </Animated.View>
      )}
      scrollEnabled={false}
    />
  );
}
