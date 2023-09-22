import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import Button from './Button';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {CART_HEIGHT} from '.';

export default function Cart({data, translateY, onClose}) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });
  return (
    <Pressable onPress={onClose}>
      <Animated.View style={[animatedStyle, styles.cartContainer]}>
        {/* <Text>CART</Text> */}

        <FlatList
          style={{flex: 1}}
          data={data}
          renderItem={({item, index}) => (
            <View style={styles.row}>
              <Image
                source={item.image}
                style={{width: 100, height: 100, marginRight: 10}}
              />
              <View>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {item.title}
                </Text>
                <Text style={{fontSize: 18, marginTop: 5, color: 'gray'}}>
                  {item.price}
                </Text>
              </View>
            </View>
          )}
        />

        <Button title={'Checkout'} radius={10} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cartContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: CART_HEIGHT,
    backgroundColor: 'white',
    zIndex: 999,
    padding: 20,
    overflow: 'hidden',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});
