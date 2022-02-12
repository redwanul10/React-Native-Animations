import React from 'react';
import {StyleSheet} from 'react-native';

import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

const SliderDot = ({translationY, index, currentIndex, animIndex}) => {
  const stylez = useAnimatedStyle(() => {
    const isActive = currentIndex === index;
    return {
      opacity: withTiming(isActive ? 1 : 0.8),
      transform: [{scale: withTiming(isActive ? 1.4 : 0.9)}],
      backgroundColor: isActive ? 'white' : 'transparent',
    };
  });
  return <Animated.View style={[styles.dot, stylez]} />;
};

export default SliderDot;

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,

    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 50,
    marginHorizontal: 5,
  },
});

// Lets add comment
