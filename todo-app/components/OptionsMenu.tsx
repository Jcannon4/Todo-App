import Animated from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import MenuText from './MenuText';
const OptionsMenu = () => {
  return (
    <Animated.View style={styles.container}>
      <MenuText msg='Delete lists' />
      <MenuText msg='Edit list name' />
      <MenuText msg='Archive List' />
      <MenuText msg='Go to Archived Lists' noBottomBorder={true} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6a51ae',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 14,
    width: 120,
    opacity: 0.8,
    position: 'absolute',
    top: 50,
    right: 0,
  },
});

export default OptionsMenu;
