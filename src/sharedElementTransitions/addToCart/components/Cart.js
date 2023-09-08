import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Animated, {
  Extrapolate,
  FadeIn,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
// import {items as data} from '../components/ProductList';
import CartItems from './CartItems';
import FakeCartItems from './FakeCartItems';

export const HEIGHT = 500;
export const OPEN_HEIGHT = HEIGHT * 0.7;

export default forwardRef(function Cart(props, ref) {
  const translateX = useSharedValue(HEIGHT);
  const start = useSharedValue(0);
  const [toggle, setToggle] = useState(false);
  const [visible, setVisible] = useState(false);
  const [notify, setNotify] = useState(false);
  const [showFakeItems, setShowFakeItems] = useState(true);

  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateX.value}],
    };
  });

  const handleOpen = value => {
    setNotify(true);
    translateX.value = withTiming(value || 0, {duration: 500});
  };

  const handleClose = value => {
    const reset = () => {
      setToggle(false);
      setVisible(false);
      setNotify(false);
      setShowFakeItems(true);
    };
    translateX.value = withTiming(HEIGHT, {duration: 500}, isFinished => {
      if (isFinished) {
        runOnJS(reset)();
      }
    });
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        open: handleOpen,
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const orderTranslateStyle = useAnimatedStyle(() => {
    const value = interpolate(translateX.value, [HEIGHT, 0], [80, 0], {
      extrapolateLeft: Extrapolate.CLAMP,
      extrapolateRight: Extrapolate.CLAMP,
    });

    return {
      transform: [{translateY: withSpring(value)}],
    };
  });

  const AnimatedPriceStyle = useAnimatedStyle(() => {
    const value = interpolate(translateX.value, [OPEN_HEIGHT, 0], [0, -70], {
      extrapolateLeft: Extrapolate.CLAMP,
      extrapolateRight: Extrapolate.CLAMP,
    });

    return {
      transform: [{translateY: value}],
    };
  });

  const hideFakeItems = finished => {
    'worklet';
    if (finished) runOnJS(setShowFakeItems)(false);
  };

  return (
    <>
      <Animated.View style={[styles.container, translateStyle]}>
        <Pressable onPress={handleClose}>
          <Text style={[styles.highlight, styles.heading]}>Cart</Text>
        </Pressable>

        <View style={{height: 192}}>
          {/* Scrollable Real Cart Items */}
          {visible && (
            <CartItems hideFakeItems={hideFakeItems} data={props.items} />
          )}

          {/* Cart Fake Items */}
          {showFakeItems && (
            <FakeCartItems
              translateX={translateX}
              setToggle={setToggle}
              toggle={toggle}
              handleOpen={handleOpen}
              data={props.items}
              start={start}
              notify={notify}
              visible={visible}
              setVisible={setVisible}
            />
          )}
        </View>

        {/* Cart Bottom Section */}
        {visible && (
          <>
            <Animated.View entering={FadeIn} style={{opacity: 0}}>
              <View
                style={{
                  borderTopWidth: 2,
                  borderTopColor: 'rgba(255, 255, 255, 0.2)',
                  paddingTop: 10,
                  marginBottom: 20,
                }}>
                <Text style={styles.highlight}>Promo Code</Text>
                <Text
                  style={[
                    styles.highlight,
                    {color: 'rgba(255, 255, 255, 0.5)', marginTop: 5},
                  ]}>
                  Enter the promo code & get discount
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 30,
                }}>
                <Text style={[styles.highlight, {fontSize: 22}]}>Total</Text>
                <Text style={[styles.highlight, {fontSize: 22}]}></Text>
              </View>
            </Animated.View>
          </>
        )}

        <Animated.View style={[styles.orderContainer, orderTranslateStyle]}>
          <Text style={styles.orderText}>Order</Text>
        </Animated.View>
      </Animated.View>

      {notify && (
        <Animated.Text
          style={[styles.highlight, styles.price, AnimatedPriceStyle]}>
          $200
        </Animated.Text>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#7651dc',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: HEIGHT,
  },
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
  heading: {fontSize: 20, marginBottom: 20},
  orderContainer: {
    width: '70%',
    backgroundColor: 'black',
    paddingVertical: 25,
    position: 'absolute',
    bottom: -20,
    right: 0,
    borderTopLeftRadius: 10,
    zIndex: 999,
    height: 100,
  },
  orderText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  price: {
    fontSize: 22,
    position: 'absolute',
    bottom: 50,
    right: 20,
  },
});
