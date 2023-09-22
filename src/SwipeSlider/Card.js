import {View, Text, StyleSheet, Dimensions, StatusBar} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {CART_HEIGHT} from '.';

const {width} = Dimensions.get('window');

const clampOptions = {
  extrapolateLeft: Extrapolate.CLAMP,
  extrapolateRight: Extrapolate.CLAMP,
};

export default function Card({translationX, index, item, translateY}) {
  // Input Ranges
  const inpurRange = [width * (index - 1), width * index, width * (index + 1)];
  const opacityInputRange = [
    width * (index - 1) + width * 0.8,
    width * index,
    width * (index + 1) - width * 0.8,
  ];

  const AnimatedBgImageStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translationX.value,
      inpurRange,

      [300, 0, -300],
      clampOptions,
    );

    const imageTranslateY = interpolate(
      translationX.value,
      inpurRange,
      [250, 0, 250],
      clampOptions,
    );

    return {
      transform: [{translateY: imageTranslateY}, {rotate: `${rotate}deg`}],
    };
  });

  const animatedOpacityStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translationX.value,
      opacityInputRange,

      [0, 1, 0],
      clampOptions,
    );

    return {
      opacity,
    };
  });

  const AnimatedBgStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translationX.value,
      opacityInputRange,
      [0, 1, 0],
      clampOptions,
    );

    return {
      opacity,
    };
  });

  const animatedTranslateTop = useAnimatedStyle(() => {
    const imageTranslateY = interpolate(
      translateY.value,
      [0, CART_HEIGHT],
      [-CART_HEIGHT * 0.2, 0],
      clampOptions,
    );

    return {
      // transform: [{translateY: withDelay(400, withTiming(imageTranslateY))}],
      transform: [{translateY: withSpring(imageTranslateY)}],
    };
  });

  return (
    <View style={{width, flex: 1}}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      {/* Background Image */}

      <Animated.View style={[styles.bgImageContainer, AnimatedBgStyle]}>
        <Animated.Image source={item.image} style={[styles.bgImage]} />
      </Animated.View>

      {/* Main Image */}
      <View style={styles.contentContainer}>
        <Animated.View style={animatedTranslateTop}>
          <Animated.Image
            source={item.image}
            style={[styles.mainImage, AnimatedBgImageStyle]}
          />
        </Animated.View>

        {/* Heading */}
        <Animated.View
          style={[styles.descriptionWrapper, animatedOpacityStyle]}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bgImageContainer: {
    width: width,
    height: width,
    ...StyleSheet.absoluteFillObject,
    top: -width * 0.2,
  },
  bgImage: {
    width: '100%',
    height: '100%',
    opacity: 0.2,
    transform: [{scale: 1.5}, {translateY: -30}],
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  price: {fontSize: 20, fontWeight: 'bold', color: '#f66085'},
  contentContainer: {
    alignItems: 'center',
    marginTop: width * 0.5,
  },
  mainImage: {
    width: width * 0.7,
    height: width * 0.7,
  },
  descriptionWrapper: {
    alignItems: 'center',
    marginTop: '10%',
  },
});
