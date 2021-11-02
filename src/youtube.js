import React from 'react';
import {View, StyleSheet, Text, Dimensions, Image} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  interpolate,
  Extrapolate,
  withTiming,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  TouchableOpacity,
} from 'react-native-gesture-handler';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width / 2;
const imageWidth = Dimensions.get('window').width / 1.06;

const half = height / 3;
const half2 = height / 1.5;
const topPosition = (height / 2.9) * -1;
const middleosition = 0;
const defaultTranslateY = 300;

const Youtube = () => {
  // const imageWidth = useSharedValue(80);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(defaultTranslateY);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.translateX = translateX.value;
      ctx.translateY = translateY.value;
      console.log('started');
    },
    onActive: (event, ctx) => {
      translateX.value = event.translationX + ctx.translateX;
      translateY.value = event.translationY + ctx.translateY;
    },
    onEnd: (_, ctx) => {
      if (translateY.value > half) {
        translateY.value = withSpring(half2);
      } else {
        translateX.value = withSpring(defaultTranslateY);
        translateY.value = withSpring(defaultTranslateY);
      }
    },
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(
        translateY.value,
        [middleosition, topPosition],
        [80, imageWidth],
        {
          extrapolateRight: Extrapolate.CLAMP,
          extrapolateLeft: Extrapolate.CLAMP,
        },
      ),
      height: interpolate(
        translateY.value,
        [middleosition, topPosition],
        [80, imageWidth],
        {
          extrapolateRight: Extrapolate.CLAMP,
          extrapolateLeft: Extrapolate.CLAMP,
        },
      ),
    };
  });

  const detailsStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translateY.value,
        [middleosition, topPosition],
        [0, 1],
        {
          extrapolateRight: Extrapolate.CLAMP,
          extrapolateLeft: Extrapolate.CLAMP,
        },
      ),
    };
  });

  // const gestureHandler = useAnimatedGestureHandler({
  //   onStart: (_, ctx) => {
  //     ctx.translateX = translateX.value;
  //     ctx.translateY = translateY.value;
  //   },
  //   onActive: (event, ctx) => {
  //     translateX.value = event.translationX + ctx.translateX;
  //     translateY.value = event.translationY + ctx.translateY;
  //   },
  //   onEnd: (_, ctx) => {
  //     if (translateY.value > half) {
  //       translateY.value = withSpring(half2);
  //     } else {
  //       translateX.value = withSpring(0);
  //       translateY.value = withSpring(0);
  //     }
  //   },
  // });

  //   const x = useSharedValue(0);

  //   const gestureHandler = useAnimatedGestureHandler({
  //     onStart: (_, ctx) => {
  //       ctx.startX = x.value;
  //       console.log('started');
  //     },
  //     onActive: (event, ctx) => {
  //       x.value = ctx.startX + event.translationX;
  //     },
  //     onEnd: _ => {
  //       x.value = withSpring(0);
  //     },
  //   });

  //   const animatedStyle = useAnimatedStyle(() => {
  //     return {
  //       transform: [
  //         {
  //           translateX: x.value,
  //         },
  //       ],
  //     };
  //   });

  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        // {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });

  // const topStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {
  //         translateX: interpolate(translateY.value, [0, 100], [0, 50], {
  //           // extrapolateRight: Extrapolate.CLAMP,
  //         }),
  //       },
  //     ],
  //   };
  // });

  return (
    <>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[translateStyle]}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 10,
              elevation: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() =>
                (translateY.value = withTiming(topPosition, {duration: 500}))
              }>
              <Animated.Image
                source={{
                  uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
                }}
                style={[imageStyle]}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 20, paddingHorizontal: 5}}>
              Function composition examples
            </Text>
          </View>
          <Animated.View style={detailsStyle}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                paddingHorizontal: 5,
                paddingVertical: 20,
              }}>
              Function composition examples
            </Text>
            <Text
              style={{
                fontSize: 20,
                paddingHorizontal: 5,
                paddingVertical: 20,
              }}>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
            </Text>
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>

      {/* <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            {
              backgroundColor: 'red',
              borderTopColor: 'grey',
              borderTopWidth: 2,
              height: height / 1.5,
            },
            // translateStyle,
          ]}></Animated.View>
      </PanGestureHandler> */}
      {/* <Animated.View
        style={[
          {
            width: 30,
            height: 30,
            backgroundColor: 'blue',
            borderRadius: 100,
          },
          topStyle,
        ]}></Animated.View> */}

      {/* <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            {
              width: 30,
              height: 30,
              backgroundColor: 'red',
              borderRadius: 100,
            },
            ,
            animatedStyle,
          ]}
        />
      </PanGestureHandler> */}
    </>
  );
};

export default Youtube;
