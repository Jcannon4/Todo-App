import React, { useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  LayoutChangeEvent,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export type DraggableItem = {
  id: string;
  title: string;
};

type Props = {
  data: DraggableItem[];
  onReorder: (newOrder: DraggableItem[]) => void;
};

export default function DraggableFlatList({ data, onReorder }: Props) {
  const positions = useSharedValue(
    Object.fromEntries(data.map((item, i) => [item.id, i]))
  );

  const flatListHeight = useRef(0);
  const ITEM_HEIGHT = 60;

  const moveItem = (id: string, newIndex: number) => {
    const currentPositions = { ...positions.value };
    const oldIndex = currentPositions[id];

    const updated = [...data];
    const [removed] = updated.splice(oldIndex, 1);
    updated.splice(newIndex, 0, removed);

    updated.forEach((item, index) => {
      currentPositions[item.id] = index;
    });

    positions.value = currentPositions;
    onReorder(updated);
  };

  const handleLayout = (e: LayoutChangeEvent) => {
    flatListHeight.current = e.nativeEvent.layout.height;
  };

  const renderItem = ({ item }: { item: DraggableItem }) => {
    return (
      <DraggableRow
        item={item}
        ITEM_HEIGHT={ITEM_HEIGHT}
        positions={positions}
        moveItem={moveItem}
        dataLength={data.length}
      />
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      onLayout={handleLayout}
    />
  );
}

type RowProps = {
  item: DraggableItem;
  ITEM_HEIGHT: number;
  positions: any;
  moveItem: (id: string, newIndex: number) => void;
  dataLength: number;
};

function DraggableRow({
  item,
  ITEM_HEIGHT,
  positions,
  moveItem,
  dataLength,
}: RowProps) {
  const translateY = useSharedValue(0);
  const isActive = useSharedValue(false);

  const longPress = Gesture.LongPress()
    .onStart(() => {
      isActive.value = true;
    })
    .minDuration(200);

  const pan = Gesture.Pan()
    .manualActivation(true)
    .onTouchesMove((e, state) => {
      if (isActive.value) {
        state.activate();
      }
    })
    .onUpdate((e) => {
      if (!isActive.value) return;
      translateY.value = e.translationY;

      const currentIndex = positions.value[item.id];
      const newIndex = clamp(
        Math.floor((currentIndex * ITEM_HEIGHT + e.translationY) / ITEM_HEIGHT),
        0,
        dataLength - 1
      );

      if (newIndex !== currentIndex) {
        runOnJS(moveItem)(item.id, newIndex);
      }
    })
    .onEnd(() => {
      isActive.value = false;
      translateY.value = withSpring(0);
    });

  const composed = Gesture.Simultaneous(longPress, pan);

  const animStyle = useAnimatedStyle(() => {
    const index = positions.value[item.id];
    return {
      transform: [
        {
          translateY: isActive.value
            ? translateY.value
            : withSpring(index * ITEM_HEIGHT - index * ITEM_HEIGHT),
        },
        { scale: withSpring(isActive.value ? 1.05 : 1) },
      ],
      zIndex: isActive.value ? 10 : 0,
    };
  });

  return (
    <GestureDetector gesture={composed}>
      <Animated.View style={[styles.row, animStyle, { height: ITEM_HEIGHT }]}>
        <Text style={styles.text}>{item.title}</Text>
      </Animated.View>
    </GestureDetector>
  );
}

/** Clamp helper */
function clamp(value: number, min: number, max: number) {
  "worklet";
  return Math.min(Math.max(value, min), max);
}

const styles = StyleSheet.create({
  row: {
    width: "100%",
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    paddingHorizontal: 15,
    marginVertical: 4,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
  },
});
