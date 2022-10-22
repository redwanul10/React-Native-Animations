import {View, Dimensions, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import DeleteIcon from './deleteIcon';

const width = Dimensions.get('window').width;
const TRANSFORM_ORIGIN_Y = (width * 20.5) / 100;
const TRANSFORM_ORIGIN_X = TRANSFORM_ORIGIN_Y + 10;

const CONVERSATION_ITEM_HEIGHT = 70;

const CLAMP = {
  extrapolateLeft: Extrapolate.CLAMP,
  extrapolateRight: Extrapolate.CLAMP,
};

const Swipable = props => {
  const [toggle, setToggle] = useState(true);
  const translateX = useSharedValue(0);

  const scale = useSharedValue(1);
  const deg = useSharedValue(0);
  const deg2 = useSharedValue(0);
  const translateTop = useSharedValue(0);

  const textOpacity = useSharedValue(0);

  const staggersTranslate = () => {
    const totalMargin = translateTop.value - CONVERSATION_ITEM_HEIGHT;
    translateTop.value = withDelay(
      props.index * 100,
      withTiming(
        totalMargin,
        {
          duration: 300,
        },
        () => {
          runOnJS(props.handleDelete)(props.selectedIndex, props.index);
          runOnJS(props.setSelectedIndex)(undefined);
        },
      ),
    );
  };

  useEffect(() => {
    if (props.selectedIndex === undefined || props.selectedIndex >= props.index)
      return;
    staggersTranslate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectedIndex, props.index]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      console.log(translateX.value);
      const total = ctx.startX + event.translationX;
      if (total > -75) {
        translateX.value = ctx.startX + event.translationX;
      } else {
        translateX.value = -75;
      }
      if (total > 0) {
        translateX.value = 0;
      }
    },
    onEnd: _ => {
      // if (translateX.value > 100) {
      //   translateX.value = withTiming(screenWidth, {}, () => {
      //     scaleX.value = withTiming(0);
      //   });
      // } else {
      //   translateX.value = withSpring(0);
      // }
    },
  });

  const selectItem = () => {
    props.setSelectedIndex(props.index);
    setToggle(false);
  };

  const handlePress = () => {
    translateX.value = withTiming(10, {duration: 300});
    scale.value = withTiming(0.3, {duration: 300});
    deg.value = withTiming(4, {duration: 300}, done => {
      if (done) {
        deg2.value = withTiming(90, {duration: 400});
        textOpacity.value = withDelay(
          1100,
          withTiming(1, {duration: 400}, opacityDone => {
            if (opacityDone) {
              runOnJS(selectItem)();
            }
          }),
        );
      }
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {scale: scale.value},
        {
          rotate: `-${deg.value}deg`,
        },
      ],
    };
  });

  const height = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateTop.value}],
      // height: scaleX.value,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const translate = interpolate(textOpacity.value, [0, 0.3], [15, 0], CLAMP);
    const opacity = interpolate(textOpacity.value, [0, 0.3], [0, 1], CLAMP);

    return {
      opacity: opacity,
      transform: [{translateY: translate}],
    };
  });

  const scaleStyle = useAnimatedStyle(() => {
    const scalee = interpolate(deg2.value, [0, 90], [1, 0], CLAMP);

    return {
      transform: [{scale: scalee}],
    };
  });

  const rotateStyle2 = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: TRANSFORM_ORIGIN_X},
        {translateY: TRANSFORM_ORIGIN_Y},
        {rotate: `${deg2.value}deg`},
        {translateX: -TRANSFORM_ORIGIN_X},
        {translateY: -TRANSFORM_ORIGIN_Y},
      ],
    };
  });
  const backgroundColor = '#EC255A';
  return (
    <Animated.View
      style={[height, {backgroundColor, height: CONVERSATION_ITEM_HEIGHT}]}>
      <PanGestureHandler
        failOffsetY={[-5, 5]}
        activeOffsetX={[-5, 5]}
        onGestureEvent={gestureHandler}>
        <Animated.View
          style={
            [
              // height,
            ]
          }>
          <Animated.Text style={[styles.deleteMsg, animatedTextStyle]}>
            Your message has been deleted
          </Animated.Text>
          <View style={styles.deleteIcon}>
            <DeleteIcon onPress={handlePress} />
          </View>
          {toggle && (
            <Animated.View style={[rotateStyle2]}>
              <Animated.View style={animatedStyle}>
                <Animated.View style={[scaleStyle]}>
                  {props.children}
                </Animated.View>
              </Animated.View>
            </Animated.View>
          )}
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default Swipable;

const styles = StyleSheet.create({
  deleteMsg: {
    position: 'absolute',
    left: 10,
    top: 25,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: 'bold',
    fontSize: 13,
  },
  deleteIcon: {position: 'absolute', right: 18, top: 0, zIndex: 1},
});
