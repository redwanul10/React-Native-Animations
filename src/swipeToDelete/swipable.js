import {View, useWindowDimensions} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

const Swipable = props => {
  const screenWidth = useWindowDimensions().width;
  const translateX = useSharedValue(0);
  const scaleX = useSharedValue(70);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
    },
    onEnd: _ => {
      if (translateX.value > 100) {
        translateX.value = withTiming(screenWidth, {}, () => {
          scaleX.value = withTiming(0);
        });
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  const height = useAnimatedStyle(() => {
    return {
      height: scaleX.value,
    };
  });

  const backgroundColor = props.backgroundColor || '#EC255A';
  return (
    <>
      <PanGestureHandler
        failOffsetY={[-5, 5]}
        activeOffsetX={[-5, 5]}
        onGestureEvent={gestureHandler}>
        <Animated.View style={[height, {backgroundColor}]}>
          <Animated.View style={[animatedStyle]}>
            {props.children}
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

export default Swipable;
