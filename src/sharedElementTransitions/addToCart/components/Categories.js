import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import React from 'react';

const items = [
  {title: 'salads', image: require('../images/salad.png')},
  {title: 'soups', image: require('../images/hot-soup.png')},
  {title: 'burgers', image: require('../images/cheeseburger.png')},
];
export default function Categories() {
  return (
    <FlatList
      data={items}
      horizontal={true}
      keyExtractor={(_, index) => index.toString()}
      ItemSeparatorComponent={<View style={{width: 10}} />}
      renderItem={({item, index}) => (
        <View
          style={[
            styles.category,
            index === 0 && {backgroundColor: '#d4eac8'},
          ]}>
          <Image source={item.image} style={{width: 20, height: 20}} />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  category: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f4f9',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  title: {fontSize: 12, marginLeft: 5, fontWeight: 'bold'},
});
