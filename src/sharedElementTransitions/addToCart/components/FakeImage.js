import {useEffect} from 'react';
import {Image, StyleSheet} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {OPEN_HEIGHT} from './Cart';

const staticPositionY = {
  2: -64,
  1: -129,
  0: -194,
};

export const FakeImage = ({index, start, onEnd, notify, translate, item}) => {
  const margin = index * 15;
  const offset = staticPositionY[index] + 2;
  const animatedValue = useSharedValue(0);
  const dimension = useSharedValue(index);

  useAnimatedReaction(
    () => translate.value,
    currentValue => {
      if (currentValue === OPEN_HEIGHT) {
        dimension.value = withTiming(1, {duration: 500});
      }
    },
  );

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      animatedValue.value,
      [0, offset],
      [0, (index * 50 + margin) * -1],
      {extrapolateLeft: Extrapolate.CLAMP, extrapolateRight: Extrapolate.CLAMP},
    );

    const dimensionValue = interpolate(dimension.value, [0, 1], [0, 50], {
      extrapolateLeft: Extrapolate.CLAMP,
      extrapolateRight: Extrapolate.CLAMP,
    });

    return {
      width: dimensionValue,
      height: dimensionValue,
      transform: [
        {translateY: animatedValue.value},
        {translateX: translateX || 0},
      ],
    };
  });

  useEffect(() => {
    if (start) {
      animatedValue.value = withTiming(
        offset,
        {
          duration: 500,
        },
        isFinished => {
          if (isFinished) runOnJS(onEnd)();
        },
      );
    }
  }, [start, animatedValue, animatedStyle.value, index, onEnd, offset]);

  return (
    <Animated.View style={[styles.imageContainer, animatedStyle]}>
      <Image
        style={styles.image}
        source={{
          uri: item.image,
        }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imageContainer: {
    borderRadius: 10,
    marginRight: 15,
  },
});
