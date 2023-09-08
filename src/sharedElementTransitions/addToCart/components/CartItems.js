import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {FadeIn} from 'react-native-reanimated';

export default function CartItems({hideFakeItems, data}) {
  return (
    <Animated.FlatList
      entering={FadeIn.withCallback(hideFakeItems)}
      style={{opacity: 0}}
      data={data}
      keyExtractor={(_, index) => index.toString()}
      ItemSeparatorComponent={<View style={{width: 10}} />}
      renderItem={({item, index}) => (
        <View style={styles.row}>
          <Image
            style={{width: 50, height: 50, borderRadius: 10}}
            source={{
              uri: item.image,
            }}
          />
          <View style={{paddingHorizontal: 10, width: '60%'}}>
            <Text style={styles.highlight}>{item.title}</Text>
          </View>
          <Text style={styles.highlight}>{item.price}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  highlight: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 12,
  },
});
