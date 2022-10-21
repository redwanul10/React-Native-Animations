import {View, useWindowDimensions, Text, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import DeleteIcon from './deleteIcon';

const width = Dimensions.get('window').width;
const TRANSFORM_ORIGIN_Y = (width * 20.5) / 100;
const TRANSFORM_ORIGIN_X = TRANSFORM_ORIGIN_Y + 10;

console.log('screen ', width);

const Swipable = props => {
  const [toggle, setToggle] = useState(true);
  const screenWidth = useWindowDimensions().width;
  const translateX = useSharedValue(0);
  const scaleX = useSharedValue(60);
  // const scaleRotate = useSharedValue(0);
  const scale = useSharedValue(1);
  const deg = useSharedValue(0);
  const deg2 = useSharedValue(0);
  const marginTop = useSharedValue(0);

  const textOpacity = useSharedValue(0);

  useEffect(() => {
    marginTop.value = 0;
  }, [props.totalConversation, marginTop]);

  const marginAnimation = () => {
    const totalMargin = marginTop.value - 60;
    marginTop.value = withDelay(
      props.index * 100,
      withTiming(
        totalMargin,
        {
          duration: 300,
          // easing: Easing.bezier(0.41, 1.27, 0.41, 0.94)
        },
        () => {
          runOnJS(props.handleDelete)(
            props.index,
            props.totalConversation - 1 === props.index,
          );
          runOnJS(props.setSelectedIndex)(undefined);
          //
          // marginTop.value = 0;
        },
      ),
    );
  };

  useEffect(() => {
    if (props.selectedIndex === undefined || props.selectedIndex >= props.index)
      return;
    marginAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectedIndex]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      console.log(translateX.value);
      if (translateX.value > -75) {
        translateX.value = ctx.startX + event.translationX;
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

  const handlePress = () => {
    // console.log(console.log(props.id));
    translateX.value = withTiming(10, {duration: 300});
    scale.value = withTiming(0.2, {duration: 300});
    deg.value = withTiming(4, {duration: 300}, done => {
      if (done) {
        // scale.value = withTiming(0, {duration: 300});
        // translateX.value = withTiming(160, {
        //   duration: 400,
        // });
        // deg.value = withTiming(-15, {duration: 100});
        deg2.value = withTiming(90, {duration: 400});
        textOpacity.value = withDelay(
          1100,
          withTiming(1, {duration: 400}, opacityDone => {
            if (opacityDone) {
              runOnJS(props.setSelectedIndex)(props.index);
              runOnJS(setToggle)(false);
            }
          }),
        );
        // scaleX.value = withDelay(1200, withTiming(0, {duration: 300}));
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
      transform: [{translateY: marginTop.value}],
      height: scaleX.value,
    };
  });

  const removeStyle = useAnimatedStyle(() => {
    return {
      height: scaleX.value,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const translate = interpolate(textOpacity.value, [0, 0.3], [10, 0], {
      extrapolateLeft: Extrapolate.CLAMP,
      extrapolateRight: Extrapolate.CLAMP,
    });
    const opacity = interpolate(textOpacity.value, [0, 0.3], [0, 1], {
      extrapolateLeft: Extrapolate.CLAMP,
      extrapolateRight: Extrapolate.CLAMP,
    });

    return {
      opacity: opacity,
      transform: [{translateY: translate}],
    };
  });

  const scaleStyle = useAnimatedStyle(() => {
    // const scalee = interpolate(deg2.value, [0, 65, 85], [1, 1, 0], {
    const scalee = interpolate(deg2.value, [0, 90], [1, 0], {
      extrapolateLeft: Extrapolate.CLAMP,
      extrapolateRight: Extrapolate.CLAMP,
    });

    return {
      transform: [{scale: scalee}],
    };
  });

  const rotateStyle2 = useAnimatedStyle(() => {
    return {
      // width: 300,
      // height: 50,
      // backgroundColor: 'blue',
      transform: [
        {translateX: TRANSFORM_ORIGIN_X},
        {translateY: TRANSFORM_ORIGIN_Y},
        {rotate: `${deg2.value}deg`},
        // {rotate: `90deg`},
        {translateX: -TRANSFORM_ORIGIN_X},
        {translateY: -TRANSFORM_ORIGIN_Y},
      ],
    };
  });
  const backgroundColor = props.backgroundColor || '#EC255A';
  return (
    <Animated.View>
      <PanGestureHandler
        failOffsetY={[-5, 5]}
        activeOffsetX={[-5, 5]}
        onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            height,
            {
              backgroundColor,
              //  marginTop: props.index === 1 ? -scaleX.value : 0
            },
          ]}>
          <Animated.Text
            style={[
              {
                position: 'absolute',
                left: 10,
                top: 25,
                color: 'rgba(255,255,255,0.8)',
                fontWeight: 'bold',
                fontSize: 13,
              },
              animatedTextStyle,
            ]}>
            Your message has been deleted
            {/* {props.title} */}
          </Animated.Text>
          <View style={{position: 'absolute', right: 18, top: 0, zIndex: 9999}}>
            <DeleteIcon onPress={handlePress} />
          </View>
          {toggle && (
            <Animated.View style={rotateStyle2}>
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
