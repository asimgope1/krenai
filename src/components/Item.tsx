import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ItemProps {
  title: string;
  description: string;
  // Define other properties of your item here
}

const Item: React.FC<ItemProps> = ({ title, description }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text>{description}</Text>
      {/* Add more item details to display */}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  // Add styles for other item details
});

export default Item;
