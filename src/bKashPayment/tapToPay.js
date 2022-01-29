import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import Svg, {Circle} from 'react-native-svg';
import Animated, {
  runOnJS,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CIRCLE_LENGTH = 1000; // 2PI*R
const R = CIRCLE_LENGTH / (2 * Math.PI);

const TapToPay = () => {
  const screen = useWindowDimensions();
  const progress = useSharedValue(0.6);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  const onPressIn = useCallback(() => {
    console.log('pressed');
    progress.value = withTiming(1, {duration: 1500}, () =>
      runOnJS(handleSuccess)(),
    );
  }, []);

  const handleSuccess = () => {
    alert('payment complete');
  };
  const onPressOut = useCallback(() => {
    console.log('pressed');
    progress.value = 0.6;
  }, []);

  //   useEffect(() => {
  //     progress.value = withTiming(progress.value > 0 ? 0 : 1, {duration: 2000});
  //   }, []);
  return (
    <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut}>
      <View style={style.paySection}>
        <>
          <Image source={require('./bKash-logo.png')} style={style.bkashLogo} />
          <Text style={style.bottomText}>Tap and hold to Mobile Recharge</Text>
          <View
            style={[
              style.circle,
              {
                width: screen.width,
                height: screen.width,
                borderRadius: screen.width,
                bottom: -screen.width * 0.65,
              },
            ]}
          />
        </>

        <Svg style={{position: 'absolute', left: 0, zIndex: -1000}}>
          <AnimatedCircle
            //   cx={200}
            //   cy={200}
            cx={screen.width * 0.3}
            cy={330}
            r={R}
            stroke={'#e2136e'}
            strokeWidth={5}
            scaleX={1.5}
            strokeDasharray={CIRCLE_LENGTH}
            animatedProps={animatedProps}
          />
        </Svg>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TapToPay;

const style = StyleSheet.create({
  paySection: {
    // backgroundColor: '#e2136e',
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  bottomText: {
    color: 'white',
    fontSize: 17,
  },
  bkashLogo: {
    width: 80,
    height: 80,
    marginBottom: -10,
  },
  circle: {
    backgroundColor: '#e2136e',
    position: 'absolute',
    zIndex: -1,
    transform: [
      {
        scaleX: 1.3,
      },
    ],
    // left: 0,
  },
});
