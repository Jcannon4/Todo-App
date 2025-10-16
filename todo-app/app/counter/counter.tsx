import React from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { increment, decrement, incrementByAmount } from './counterSlice';

export default function Counter() {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Count: {count}</Text>
            <Button title="Increment" onPress={() => dispatch(increment())} />
            <Button title="Decrement" onPress={() => dispatch(decrement())} />
            <Button title="Increment by 5" onPress={() => dispatch(incrementByAmount(5))} />
        </View>
    );
}