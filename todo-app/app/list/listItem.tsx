import { v6 as uuidv6 } from 'uuid';
import { StyleSheet, Pressable, TextInput, Keyboard } from 'react-native';
import Animated, { LinearTransition, FadeIn } from 'react-native-reanimated';
import { Link } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import edit from '../../assets/images/edit.png';
import trash from '../../assets/images/delete.png';
import { ListItemProps, deleteList, editListName } from './listSlice';
import React, { JSX, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { apiDeleteList } from '@/api/services';

// Creates List objects for us to store into the state
// returns to the task modal before being shipped to the reducer
export function createListItemProps(text: string): ListItemProps {
  const listData: ListItemProps = {
    id: uuidv6(),
    _internal_uuid: uuidv6(),
    title: text,
    // MIGHT HAVE TO REDO THIS I think items: {} is wrong
    todo: { items: {}, order: [], incompleteCount: 0 }, //  what does a TodoState look like?
  };
  return listData;
}

const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: {
  condition: boolean;
  wrapper: (children: React.ReactNode) => JSX.Element;
  children: React.ReactNode;
}) => (condition ? wrapper(children) : <>{children}</>);

const ListItem = ({
  title,
  id,
  todo,
  _internal_uuid,
  optionState,
  onLongPress,
}: ListItemProps & { optionState: boolean; onLongPress?: VoidFunction }) => {
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [titleValue, setTitleValue] = React.useState<string>(title);
  const inputRef = React.useRef<TextInput>(null);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (isEditing && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isEditing]);

  const openEditor = () => setIsEditing(true);
  const closeEditor = () => {
    setIsEditing(false);
    dispatch(editListName({ newName: titleValue, listID: id }));
    Keyboard.dismiss();
  };
  const onDelete = () => {
    dispatch(deleteList({ listID: id }));
    apiDeleteList(id);
  };

  return (
    <ConditionalWrapper
      condition={!optionState}
      wrapper={(children) => (
        <Link
          href={{
            pathname: '/todoList',
            params: { id: id, title: title },
          }}
          asChild
        >
          {children}
        </Link>
      )}
    >
      <Pressable onLongPress={onLongPress}>
        <Animated.View
          style={styles.container}
          layout={LinearTransition.duration(300)}
        >
          {optionState ? (
            <Pressable onPress={openEditor}>
              <Animated.Image
                source={edit}
                style={styles.edit}
                tintColor='grey'
                entering={FadeIn.duration(500)}
              ></Animated.Image>
            </Pressable>
          ) : null}

          {!isEditing ? (
            <Animated.Text
              layout={LinearTransition.duration(500)}
              style={styles.content}
            >
              {title}
            </Animated.Text>
          ) : (
            <Animated.View
              layout={LinearTransition.duration(300)}
              entering={FadeIn.duration(200)}
              style={styles.inputContainer}
            >
              <TextInput
                ref={inputRef}
                value={titleValue}
                onChangeText={setTitleValue}
                onBlur={closeEditor}
                style={styles.input}
                placeholder='Edit title...'
                placeholderTextColor='#aaa'
                returnKeyType='done'
                onSubmitEditing={closeEditor}
              />
            </Animated.View>
          )}

          {optionState ? (
            <Pressable onPress={onDelete}>
              <Animated.Image
                source={trash}
                style={styles.trash}
                tintColor='#FF5252'
                entering={FadeIn.duration(300)}
              ></Animated.Image>
            </Pressable>
          ) : (
            <Animated.View
              layout={LinearTransition.duration(300)}
              //exiting={FadeOut.duration(500)}
              entering={FadeIn.duration(500)}
            >
              <AntDesign color='white' name='right' size={28}></AntDesign>
            </Animated.View>
          )}
        </Animated.View>
      </Pressable>
    </ConditionalWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: 'row',
    width: '88%',
    alignContent: 'center',
    alignSelf: 'center', // Helps with overall centering if needed
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 14,
    marginBottom: 20,
    padding: 10,
    boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.3)',
  },
  edit: {
    width: 40,
    height: 40,

    borderColor: 'transparent',
    borderWidth: 2,
    //alignSelf: "flex-end",
  },
  checkmark: {
    height: 25,
    width: 25,
  },
  trash: {
    width: 40,
    height: 40,
    borderRadius: 50, // Example: make it circular
    borderColor: 'transparent',
    borderWidth: 2,
    alignSelf: 'flex-end',
  },
  content: {
    flex: 5,
    textAlign: 'left',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    color: '#E0E0E0',
    flexWrap: 'wrap',
    marginLeft: 15,
  },
  inputContainer: {
    flex: 1,
    marginLeft: 15,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 16,
    color: 'white',
    // alignSelf: 'center'
    justifyContent: 'center',
  },
});

export default ListItem;
