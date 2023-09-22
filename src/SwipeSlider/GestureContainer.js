import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');

export default function GestureContainer({
  translateX,
  children,
  numberOfItems,
}) {
  var totalWidth = (numberOfItems - 1) * width;

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      const total = ctx.startX + event.translationX;
      if (!ctx.firstX) ctx.firstX = total;
    },
    onEnd: (event, ctx) => {
      const total = ctx.startX + event.translationX;
      var value = 0;

      //   Swipe Left
      if (total < ctx.startX) {
        value = translateX.value + width;
        if (value > totalWidth) return;
      }

      // Swipe Right
      if (total > ctx.startX) {
        value = translateX.value - width;
        if (value < 0) return;
      }

      translateX.value = withTiming(value, {
        duration: 1000,
      });
      ctx.startX = 0;
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: -translateX.value}],
    };
  });
  return (
    <PanGestureHandler
      failOffsetY={[-5, 5]}
      activeOffsetX={[-5, 5]}
      onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.container, animatedStyle]}>
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: width * 4,
    flex: 1,
    position: 'relative',
  },
});
