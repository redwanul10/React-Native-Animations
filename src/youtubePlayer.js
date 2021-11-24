import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
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
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import Video from 'react-native-video';

const SIZES = Dimensions.get('window');

const navigationHeight =
  Dimensions.get('screen').height - SIZES.height + StatusBar.currentHeight;

// IMAGE SIZES
const IMAGE_TOP_DISTANCE = 100;
const IMAGE_BOTTOM_DISTANCE = SIZES.width / 1.2;
const SMALL_IMAGE_SIZE = 120;
const BIG_IMAGE_SIZE = SIZES.height / 3.2;

// IMAGE WIDTH
const IMAGE_WIDTH_COL = (SIZES.width * 33) / 100;
const TITLE_WIDTH_COL = (SIZES.width * 33) / 100;

// const IMAGE_TOP_DISTANCE = 100;
// const IMAGE_TOP_DISTANCE = 100;

// End of Screen
const FINISH_TOP = (SIZES.height * 70) / 100;
const FINISH_BOTTOM = (SIZES.height * 90) / 100;
const screenHeight = Dimensions.get('screen').height;
let bottomTranslateY = (screenHeight * 95) / 100 - IMAGE_WIDTH_COL - 20;

const YoutubePlayer = ({onClose, selectedVideo, bottomPosition}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(300);

  useEffect(() => {
    translateY.value = withTiming(0, {duration: 300});
  }, []);

  useEffect(() => {
    if (selectedVideo) {
      translateY.value = withTiming(0, {duration: 300});
    }
  }, [selectedVideo]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.translateX = translateX.value;
      ctx.translateY = translateY.value;

      if (ctx.translateY === bottomTranslateY) {
        ctx.bottomSwipe = true;
      } else {
        ctx.bottomSwipe = false;
      }
    },
    onActive: (event, ctx) => {
      translateX.value = event.translationX + ctx.translateX;
      translateY.value = event.translationY + ctx.translateY;
    },
    onEnd: (_, ctx) => {
      if (ctx.bottomSwipe && bottomTranslateY - 80 > translateY.value) {
        translateY.value = withTiming(0, {duration: 300});
        return;
      }

      if (translateY.value > 100) {
        // translateY.value = withTiming(screenHeight - IMAGE_WIDTH_COL - StatusBar.currentHeight - 10, {
        //   duration: 300,
        // });
        translateY.value = withTiming(bottomTranslateY, {
          duration: 300,
        });
        return;
      }

      // if (bottomTranslateY > translateY.value) {
      //   translateY.value = withTiming(0, { duration: 300 });
      // }

      // else {
      //   // translateX.value = withTiming(0, {duration: 300});
      translateY.value = withTiming(0, {duration: 300});
      // }
    },
  });

  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  // translateY: interpolate(
  //   translateY.value,
  //   [0, bottomPosition - (SIZES.height - bottomPosition)],
  //   [0, bottomPosition - (SIZES.height - bottomPosition)],
  //   {
  //     extrapolateRight: Extrapolate.CLAMP,
  //     extrapolateLeft: Extrapolate.CLAMP,
  //   }
  // ),

  // const sideTitleStyle = useAnimatedStyle(() => {
  //   return {
  //     width: interpolate(
  //       translateY.value,
  //       [IMAGE_TOP_DISTANCE, IMAGE_BOTTOM_DISTANCE],
  //       [0, 100],
  //     ),
  //   };
  // });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(
        translateY.value,
        [IMAGE_TOP_DISTANCE, IMAGE_BOTTOM_DISTANCE],
        [SIZES.width, IMAGE_WIDTH_COL],
        {
          extrapolateRight: Extrapolate.CLAMP,
          extrapolateLeft: Extrapolate.CLAMP,
        },
      ),
      height: interpolate(
        translateY.value,
        [IMAGE_TOP_DISTANCE, IMAGE_BOTTOM_DISTANCE],
        [BIG_IMAGE_SIZE, IMAGE_WIDTH_COL - 20],
        {
          extrapolateRight: Extrapolate.CLAMP,
          extrapolateLeft: Extrapolate.CLAMP,
        },
      ),
      padding: interpolate(
        translateY.value,
        [IMAGE_TOP_DISTANCE, (SIZES.height * 70) / 100],
        [0, 5],
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

  const expandPlayer = () => {
    if (translateY.value > 100) {
      translateY.value = withTiming(0, {duration: 300});
    }
  };

  return (
    <Animated.View
      style={[
        translateStyle,
        {
          backgroundColor: 'white',
          elevation: 10,
          width: '100%',
          height: '100%',
          position: 'absolute',
          zIndex: 9999,
        },
      ]}>
      <View style={styles.playerContainer}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View>
            <TouchableWithoutFeedback
              onPress={expandPlayer}
              style={styles.playerContainer}>
              <Animated.View style={[imageStyle]}>
                <Image
                  style={[{width: '100%', height: '100%', resizeMode: 'cover'}]}
                  source={{
                    uri:
                      selectedVideo?.snippet?.thumbnails?.medium?.url ||
                      'https://i.ytimg.com/vi/duJNVv9m2NY/maxresdefault.jpg',
                  }}
                />
              </Animated.View>

              <Text
                numberOfLines={2}
                style={[
                  styles.sideTitle,
                  {
                    width: (SIZES.width * 43) / 100,
                  },
                ]}>
                {selectedVideo?.snippet?.title}
              </Text>
            </TouchableWithoutFeedback>
          </Animated.View>
        </PanGestureHandler>
        <View
          style={[styles.iconsContainer, {width: (SIZES.width * 23) / 100}]}>
          <Icon2 name="controller-play" size={30} color="black" />
          <TouchableOpacity
            onPress={e => {
              e.stopPropagation();
              onClose();
            }}>
            <Icon name="close" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <Animated.View style={[detailsStyle, styles.container]}>
        <Text style={styles.title}>{selectedVideo?.snippet?.title}</Text>
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
                {selectedVideo?.snippet?.channelTitle}
              </Text>
              <Text>41.7K subscribers</Text>
            </View>
          </View>

          <Text style={styles.subBtn}>Subscribe</Text>
          {/* <Video
          source={{ uri: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1' }}
          style={{ width: 300, height: 300 }}
          controls={true}
          playInBackground={true}
          // ref={(ref) => {
          // this.player = ref
          // }} 
          /> */}
        </View>
      </Animated.View>
    </Animated.View>
  );
};

export default YoutubePlayer;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  sideTitle: {
    paddingLeft: 5,
    fontSize: 18,
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
  playerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
