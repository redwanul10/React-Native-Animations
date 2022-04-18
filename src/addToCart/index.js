import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
  withSpring,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';
import Ripple from 'react-native-material-ripple';

const {width, height} = Dimensions.get('window');
const center = {x: width / 2, y: height / 2};
console.log('===== width', width / 3.5);
const AddToCart = () => {
  const [layout, setLayout] = useState({});
  const rotate = useSharedValue(0);
  const initialTranslateX = width / 3.5;
  const translateX = useSharedValue(initialTranslateX);
  const cartCounter = useSharedValue(0);
  const bounceCart = useSharedValue(0);
  const [cart, setCart] = useState(0);

  const cartCounterStyle = useAnimatedStyle(() => {
    return {
      // opacity: cartCounter.value,
      transform: [{scale: cartCounter.value}],
    };
  });

  const cartStyle = useAnimatedStyle(() => {
    const tranX = interpolate(
      bounceCart.value,
      [0, 0.2, 0.4, 0.6, 0.8, 1],
      [0, -20, 20, -20, 20, 0],
      {
        extrapolateLeft: Extrapolate.CLAMP,
        extrapolateRight: Extrapolate.CLAMP,
      },
    );
    return {
      transform: [{translateX: withSpring(tranX)}],
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    var transY = interpolate(rotate.value, [10, 60, 120, 170], [0, 35, 35, 0], {
      extrapolateLeft: Extrapolate.CLAMP,
      extrapolateRight: Extrapolate.CLAMP,
    });
    return {
      transform: [
        {translateY: transY},
        {translateX: -1 * translateX.value},
        {rotateZ: `-${rotate.value}deg`},
        {translateX: translateX.value},
      ],
    };
  });

  console.log(layout);
  const animateBounce = () => {
    'worklet';
    translateX.value = withSpring(5);
  };

  const increment = () => setCart(cart + 1);
  return (
    <SafeAreaView style={style.container}>
      {/* <View style={style.container}> */}
      <View style={style.row}>
        <View
          onLayout={event => {
            setLayout(event.nativeEvent.layout);
          }}
          style={[style.col, {flex: 1, alignItems: 'center'}]}>
          <Animated.View style={[{position: 'relative'}, cartStyle]}>
            <Icon name="ios-cart-outline" color="black" size={30} />
            <Animated.View
              style={[
                style.circle,
                cartCounterStyle,
                {
                  top: -3,
                  right: -4,
                  zIndex: 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 12}}>
                {cart}
              </Text>
            </Animated.View>
          </Animated.View>
        </View>
        <Ripple
          onPress={() => {
            // translateY.value = withTiming(20, {duration: 1000});
            rotate.value = withTiming(
              180,
              {
                duration: 800,
                // easing: Easing.linear,
                // easing: Easing.bezier(0.17, 0.67, 0.68, 0.33),
                // cubic-bezier(.17,.67,.68,.33)**
                // cubic-bezier(.15,.57,.31,.83)*
                // cubic-bezier(.17,.67,.84,.33)
              },
              isFinished => {
                if (isFinished) {
                  rotate.value = 0;
                  cartCounter.value = 0;

                  if (cartCounter.value < 1 && cart === 0) {
                    console.log('1st cond');
                    cartCounter.value = withTiming(1, {duration: 0}, done => {
                      if (done) {
                        // cartCounter.value = 0;
                        runOnJS(increment)();
                      }
                    });
                  } else {
                    console.log('2nd cond');
                    cartCounter.value = withSpring(1, {duration: 600}, done => {
                      if (done) {
                        // cartCounter.value = 0;
                        runOnJS(increment)();
                      }
                    });
                  }
                  // animateBounce();
                }
              },
            );
            // bounceCart.value = withDelay(700, withTiming(1, {duration: 400}));
            // bounceCart.value = withTiming(1, {duration: 400});
          }}
          style={[style.col, style.addToCartBtn]}>
          <View>
            <Text style={{color: 'white', textAlign: 'center'}}>
              Add To Cart
            </Text>
            <Animated.View style={[style.circle, animatedStyle]} />
            {/* <View style={[style.circle]} /> */}
          </View>
        </Ripple>
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
};

export default AddToCart;

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  col: {
    // backgroundColor: 'red',
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  addToCartBtn: {
    backgroundColor: '#ff007f',
    flex: 1.5,
  },
  circle: {
    width: 20,
    height: 20,
    backgroundColor: '#ff007f',
    borderRadius: 50,
    position: 'absolute',
    right: '30%',
    bottom: '25%',
    zIndex: -1,
    // transform: [
    //   {translateX: -1 * (width / 4)},
    //   {rotateZ: '-0deg'},
    //   {translateX: width / 4},
    // ],
  },
});
