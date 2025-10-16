import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, FlatList } from 'react-native';

const ListItem = ({...props}) => {
//   const [elements, setElements] = useState([]);
//   const [counter, setCounter] = useState(0);

//   const addElement = () => {
//     setCounter(prevCounter => prevCounter + 1);
//     setElements(prevElements => [...prevElements, { id: counter, text: `New Element ${counter + 1}` }]);
//   };

  return (
    <View style={styles.container}>
        <Text>New Item</Text>
      {/* <Button title="Add New Element" onPress={addElement} />
      <View style={styles.elementsContainer}>
        {elements.map(item => (
          <Text key={item.id} style={styles.elementText}>
            {item.text}
          </Text>
        ))}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  elementsContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  elementText: {
    fontSize: 18,
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    width: '80%',
    textAlign: 'center',
  },
});

export default ListItem;