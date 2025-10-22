import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring, // We'll show an alternative withSpring too
  Easing,
} from 'react-native-reanimated';

const QuickVerticalAnimation: React.FC = () => {
  // 1. `useSharedValue`: This is the core of Reanimated.
  // It creates a mutable value that can be read and updated directly on the UI thread.
  // We'll use it to control the translateY (vertical position).
  const translateY = useSharedValue(0); // Start at the top (0 offset from its original position)

  // 2. `useAnimatedStyle`: This hook creates a style object that can be
  // updated on the UI thread without re-rendering the React component.
  const animatedBoxStyle = useAnimatedStyle(() => {
    return {
      // We animate the 'transform' property, specifically 'translateY'.
      // This will move the box vertically based on the `translateY.value`.
      transform: [{ translateY: translateY.value }],
    };
  });

  // 3. Animation Logic: A function to start the animation
  const animateQuickly = () => {
    // `withTiming`: Animates a shared value to a target value over a specified duration
    // and an easing function.
    translateY.value = withTiming(
      300, // Target value: move 300 pixels down
      {
        duration: 300, // Very quick: 300 milliseconds
        easing: Easing.linear, // Simple linear progression for speed
        // Or Easing.inOut(Easing.ease) for a smoother start/end
      },
      (isFinished) => {
        // Optional callback fired when the animation finishes
        if (isFinished) {
          console.log('Quick animation finished!');
          // You could reset here or chain another animation
          // translateY.value = withTiming(0, { duration: 100 }); // Quickly reset
        }
      }
    );
  };

  // Alternative animation logic with `withSpring` for a bouncy feel
  const animateWithSpring = () => {
    translateY.value = withSpring(
      -100, // Move up 100 pixels
      {
        damping: 15, // How much the spring should resist movement (less damping = more bounce)
        stiffness: 150, // How stiff the spring is (higher stiffness = faster, more aggressive bounce)
      },
      (isFinished) => {
        if (isFinished) {
          console.log('Spring animation finished!');
        }
      }
    );
  };

  const resetPosition = () => {
    translateY.value = withTiming(0, { duration: 100 }); // Reset to original position
  };

  // Run the quick animation automatically when the component mounts for demonstration
  useEffect(() => {
    animateQuickly(); // Uncomment to run on mount
  }, []);


  return (
    <View style={styles.container}>
      {/* The Animated.View is essential for Reanimated styles to work */}
      <Animated.View style={[styles.box, animatedBoxStyle]}>
        <Text style={styles.boxText}>Move Me!</Text>
      </Animated.View>

      <View style={styles.buttonContainer}>
        <Button title="Animate Down (Quick Timing)" onPress={animateQuickly} />
        <Button title="Animate Up (Spring)" onPress={animateWithSpring} />
        <Button title="Reset Position" onPress={resetPosition} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'orange',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', // Allows us to use translateY relative to its initial render position
    top: 50, // Start higher up for more vertical space
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonContainer: {
    //position: 'absolute',
    bottom: 50,
    width: '80%',
    flexDirection: 'column',
    gap: 10,
  }
});

export default QuickVerticalAnimation;