import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import Svg, {Path} from 'react-native-svg';
import Animated, {
  runOnJS,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
const AnimatedPath = Animated.createAnimatedComponent(Path);

const TapToPay = () => {
  const screen = useWindowDimensions();
  const progress = useSharedValue(0);
  const [viewLayout, setViewLayout] = useState(0);
  const CIRCLE_LENGTH = viewLayout.width + viewLayout.width * 0.15 || 385;

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  const onPressIn = () => {
    progress.value = withTiming(1, {duration: 1500}, data => {
      if (data) {
        progress.value = 0;
        runOnJS(handleSuccess)(data);
      }
    });
  };

  const handleSuccess = data => {
    alert('payment complete');
  };
  const onPressOut = () => {
    if (progress.value !== 0) progress.value = 0;
  };

  return (
    <>
      <View
        style={style.paySection}
        onLayout={e => {
          setViewLayout(e.nativeEvent.layout);
        }}>
        <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut}>
          <View style={style.holdSection}>
            <Image
              source={require('./bKash-logo.png')}
              style={style.bkashLogo}
            />
            <Text style={[style.bottomText]}>
              Tap and hold to Mobile Recharge
            </Text>
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
          </View>
        </TouchableWithoutFeedback>

        {viewLayout.width && (
          <Svg style={style.svg} cx={0} cy={10}>
            <AnimatedPath
              d={`M -10 86 Q ${viewLayout.width / 2.1} -20 ${
                viewLayout.width
              } 80`}
              fill="none"
              stroke="#e2136e"
              strokeWidth="5px"
              strokeDasharray={CIRCLE_LENGTH}
              animatedProps={animatedProps}
            />
          </Svg>
        )}
      </View>
    </>
  );
};

export default TapToPay;

const style = StyleSheet.create({
  paySection: {
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
        scaleX: 1.35,
      },
    ],
  },
  svg: {
    position: 'absolute',
    width: '100%',
    height: 180,
    bottom: '5%',
    zIndex: -99999999999,
  },
  holdSection: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
