import React from 'react';
import {Image, Dimensions, StyleSheet} from 'react-native';
import Animated, {useAnimatedStyle, interpolate} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

const BackgroundImage = ({item, translationY, index}) => {
  const stylez = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translationY.value,
        [(index - 1) * width, index * width, (index + 1) * width],
        [0, 1, 0],
      ),
    };
  });

  return (
    <Animated.View
      style={[stylez, {width, height}, StyleSheet.absoluteFillObject]}>
      <Image source={{uri: item}} style={styles.image} blurRadius={20} />
    </Animated.View>
  );
};

export default BackgroundImage;

const styles = StyleSheet.create({
  image: {width: '100%', height: '100%'},
});
