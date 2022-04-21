import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {
  useEffect,
  useMemo,
  memo,
  useRef,
  useState,
  useCallback,
} from 'react';
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
  const [circles, setcircles] = useState([]);
  let timerRef = useRef();
  let animRef = useRef({counter: 0, anims: []});

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

  let counterRef = useRef(0);
  let startedRef = useRef(false);

  const increment = () => {
    console.log('=========', counterRef.current);
    setCart(counterRef.current);
  };

  const addToCartAnim = () => {
    // 'worklet';
    cartCounter.value = 0;
    counterRef.current += 1;
    cartCounter.value = withSpring(1, {duration: 600}, done => {
      if (done) runOnJS(increment)();
    });
  };

  const saveAnimFunc = func => {
    animRef?.current?.anims?.push(func);
  };

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
            startedRef.current = true;
            const jump = animRef.current.anims[animRef.current.counter];
            if (jump) jump();
            if (animRef.current.counter > 5) {
              animRef.current.counter = 0;
            } else {
              animRef.current.counter += 1;
            }
          }}
          style={[style.col, style.addToCartBtn]}>
          <View>
            <Text style={{color: 'white', textAlign: 'center'}}>
              Add To Cart
            </Text>
            {/* <Animated.View style={[style.circle, animatedStyle]} /> */}
            {circles.map((item, i) => (
              <AnimatedCircle
                index={i}
                key={item.id}
                itemQuantity={i}
                onRotateEnd={addToCartAnim}
                onInit={func => (animRef.current = func)}
              />
            ))}
            <AnimatedCircle
              index={1}
              key={1}
              itemQuantity={1}
              onRotateEnd={addToCartAnim}
              onInit={saveAnimFunc}
            />
            <AnimatedCircle
              index={2}
              key={2}
              itemQuantity={2}
              onRotateEnd={addToCartAnim}
              onInit={saveAnimFunc}
            />
            <AnimatedCircle
              index={3}
              key={3}
              itemQuantity={3}
              onRotateEnd={addToCartAnim}
              onInit={saveAnimFunc}
            />
            <AnimatedCircle
              index={4}
              key={4}
              itemQuantity={4}
              onRotateEnd={addToCartAnim}
              onInit={saveAnimFunc}
            />
            <AnimatedCircle
              index={5}
              key={5}
              itemQuantity={5}
              onRotateEnd={addToCartAnim}
              onInit={saveAnimFunc}
            />
            <AnimatedCircle
              index={6}
              key={6}
              itemQuantity={6}
              onRotateEnd={addToCartAnim}
              onInit={saveAnimFunc}
            />

            <AnimatedCircle
              index={7}
              key={7}
              itemQuantity={7}
              onRotateEnd={addToCartAnim}
              onInit={saveAnimFunc}
            />

            <AnimatedCircle
              index={8}
              key={8}
              itemQuantity={8}
              onRotateEnd={addToCartAnim}
              onInit={saveAnimFunc}
            />

            {/* <View style={[style.circle]} /> */}
          </View>
        </Ripple>
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
};

export default AddToCart;

export const AnimatedCircleMemo = ({onRotateEnd, index, onInit}) => {
  const rotate = useSharedValue(0);
  const initialTranslateX = width / 3.5;
  const translateX = useSharedValue(initialTranslateX);

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

  const addToCartAnim = () => {
    console.log('========= called car func');
    rotate.value = withTiming(
      180,
      {
        duration: 800,
      },
      isFinished => {
        // if (isFinished) {
        rotate.value = 0;
        runOnJS(onRotateEnd)();
        // onRotateEnd();
        // }
      },
    );
  };
  console.log('memo rerendered ', index);

  useEffect(() => {
    // addToCartAnim();
    onInit(addToCartAnim);
  }, []);
  return <Animated.View style={[style.circle, animatedStyle]} />;
  // return <View />;
};

// const AnimatedCircle = React.memo(AnimatedCircleMemo, MEMO);
const MEMO = (prev, next) => {
  return next.itemQuantity !== prev.itemQuantity ? false : true;
};

var AnimatedCircle = React.memo(AnimatedCircleMemo, MEMO);

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
