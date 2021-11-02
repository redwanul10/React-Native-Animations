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
import Icon from 'react-native-vector-icons/AntDesign';

const SIZES = Dimensions.get('window');

// IMAGE SIZES
const IMAGE_TOP_DISTANCE = 100;
const IMAGE_BOTTOM_DISTANCE = SIZES.width / 1.2;
const SMALL_IMAGE_SIZE = 120;
const BIG_IMAGE_SIZE = SIZES.height / 3.2;

// End of Screen
const FINISH_TOP = (SIZES.height * 70) / 100;
const FINISH_BOTTOM = (SIZES.height * 90) / 100;

const YoutubePlayer = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

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
      // if (translateY.value > half) {
      //   translateY.value = withSpring(half2);
      // } else {
      translateX.value = withTiming(0, {duration: 300});
      translateY.value = withTiming(0, {duration: 300});
      // }
    },
  });

  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(
        translateY.value,
        [IMAGE_TOP_DISTANCE, IMAGE_BOTTOM_DISTANCE],
        [SIZES.width, SMALL_IMAGE_SIZE],
        {
          extrapolateRight: Extrapolate.CLAMP,
          extrapolateLeft: Extrapolate.CLAMP,
        },
      ),
      height: interpolate(
        translateY.value,
        [IMAGE_TOP_DISTANCE, IMAGE_BOTTOM_DISTANCE],
        [BIG_IMAGE_SIZE, SMALL_IMAGE_SIZE],
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
        [IMAGE_TOP_DISTANCE, (SIZES.height * 70) / 100],
        [1, 0],
        {
          extrapolateRight: Extrapolate.CLAMP,
          extrapolateLeft: Extrapolate.CLAMP,
        },
      ),
    };
  });

  return (
    <View>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={translateStyle}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Animated.Image
              style={[imageStyle, {resizeMode: 'cover'}]}
              source={{
                uri: 'https://i.ytimg.com/vi/duJNVv9m2NY/maxresdefault.jpg',
              }}
            />

            <Text style={{paddingLeft: 20, fontSize: 18, color: 'black'}}>
              Realme Buds Air Neo || Best Budget TWS In BD
            </Text>
          </View>
          <Animated.View style={[detailsStyle, styles.container]}>
            <Text style={styles.title}>
              Realme Buds Air Neo || Best Budget TWS In BD
            </Text>
            <View style={styles.iconsContainer}>
              <Icon name="like2" size={30} color="black" />
              <Icon name="dislike2" size={30} color="black" />
              <Icon name="sharealt" size={30} color="black" />
              <Icon name="addfile" size={30} color="black" />
            </View>
            <View style={[styles.rowCenter, {justifyContent: 'space-between'}]}>
              <View style={styles.rowCenter}>
                <Image
                  style={{width: 50, height: 50, marginRight: 10}}
                  source={{
                    uri: 'https://yt3.ggpht.com/ytc/AKedOLR-TP_Uc-gh9UWENj1CsWNVyxDRwCikaVARVwhY=s48-c-k-c0x00ffffff-no-rj',
                  }}
                />
                <View>
                  <Text style={{fontWeight: 'bold', fontSize: 18}}>
                    Lama Dev
                  </Text>
                  <Text>41.7K subscribers</Text>
                </View>
              </View>

              <Text style={styles.subBtn}>Subscribe</Text>
            </View>
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default YoutubePlayer;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  iconsContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subBtn: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'red',
    padding: 10,
  },
});
