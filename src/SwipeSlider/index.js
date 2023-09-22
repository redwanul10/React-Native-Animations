import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Platform,
} from 'react-native';
import React, {useRef} from 'react';
import Card from './Card';
import {
  useAnimatedScrollHandler,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import GestureContainer from './GestureContainer';
import Cart from './Cart';
import Button from './Button';

const data = [
  {
    title: 'Grand Italiano',
    price: '$8.60',
    image: require('./images/pizza1.png'),
  },
  {
    title: 'Grand Italiano',
    price: '$8.60',
    image: require('./images/pizza2.png'),
  },
  {
    title: 'Chicken Hawaii',
    price: '$19.00',
    image: require('./images/pizza3.png'),
  },
  {
    title: 'Vegge Lover',
    price: '$99.00',
    image: require('./images/pizza4.png'),
  },
];

const cartItems = data.slice(1, 4);
// const cartItems = data;

const {width, height} = Dimensions.get('window');

export const CART_HEIGHT = height * 0.6;
const TOTAL_TRANSLATE_Y =
  Platform.OS === 'ios' ? CART_HEIGHT + 100 : CART_HEIGHT;

export default function SwipeSlider() {
  const flatlistRef = useRef();
  const translationX = useSharedValue(0);
  const translateY = useSharedValue(TOTAL_TRANSLATE_Y);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translationX.value = event.contentOffset.x;
  });

  const handleCartClose = () => {
    translateY.value = withTiming(TOTAL_TRANSLATE_Y, {duration: 900});
  };

  const handleCartOpen = () => {
    translateY.value = withTiming(0, {duration: 900});
  };

  return (
    <>
      {/* Flatlist Example */}

      {/* <Animated.FlatList
        ref={flatlistRef}
        data={data}
        horizontal={true}
        pagingEnabled={true}
        onScroll={scrollHandler}
        snapToAlignment={'center'}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0.6}
        snapToInterval={width}
        //   scrollEnabled={false}
        renderItem={({index, item}) => (
          <Card translationX={translationX} index={index} item={item} />
        )}
      /> */}

      {/* Gesture Example */}
      <View style={{flex: 1}}>
        <GestureContainer translateX={translationX} numberOfItems={data.length}>
          {data.map((item, index) => (
            <Card
              key={index}
              translationX={translationX}
              translateY={translateY}
              index={index}
              item={item}
            />
          ))}
        </GestureContainer>

        <Button title={'Add to Cart'} onPress={handleCartOpen} />
      </View>

      <Cart
        data={cartItems}
        translateY={translateY}
        onClose={handleCartClose}
      />
      <SafeAreaView style={{backgroundColor: 'black'}}></SafeAreaView>
    </>
  );
}
