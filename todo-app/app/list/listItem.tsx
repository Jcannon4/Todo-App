import { v6 as uuidv6 } from 'uuid';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

import { ListItemProps } from './listSlice';
// Creates List objects for us to store into the state
// returns to the task modal before being shipped to the reducer
export function createListItemProps(text: string): ListItemProps {
  const listData: ListItemProps = {
    id: uuidv6(),
    title: text,
    isComplete: false,
    isArchived: false,
    // MIGHT HAVE TO REDO THIS I think items: {} is wrong
    todo: { items: {}, order: [], incompleteCount: 0 }, //  what does a TodoState look like?
  };
  return listData;
}

const ListItem = ({
  title,
  id,
  isComplete,
  todo,
  isArchived,
}: ListItemProps) => {
  return (
    <Link
      href={{
        pathname: '/todoList',
        params: { id: id, title: title },
      }}
      asChild
    >
      <Pressable>
        <View style={styles.container}>
          {/* <Animated.Image
          tintColor="#00E676"
          style={styles.checkmark}
          source={checkmark}
        ></Animated.Image> */}
          <Text style={styles.content}>{title}</Text>
          <AntDesign
            color='white'
            style={styles.options}
            name='right'
            size={28}
          ></AntDesign>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 14,
    marginBottom: 20,
    padding: 10,
    boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.3)',
  },

  checkmark: {
    height: 25,
    width: 25,
  },
  content: {
    flex: 5,
    textAlign: 'left',
    justifyContent: 'flex-start',
    alignContent: 'center',
    color: '#E0E0E0',
    flexWrap: 'wrap',
    marginLeft: 15,
  },
  options: {},
});

export default ListItem;
