import {
  View,
  FlatList,
  SafeAreaView,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

const SCREEN_WIDTH = Dimensions.get('window').height;

const CALENDAR_HEIGHT = 150;
const MENU_HEIGHT = 60;
const GESTURE_SECTION_HEIGHT = SCREEN_WIDTH - CALENDAR_HEIGHT;
const MANURAL_SCROLL = 50;

export default function GoogleCalendar() {
  const [toggleGesture, setToggleGesture] = useState(false);
  const translationY = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = translationY.value;
    },
    onActive: (event, ctx) => {
      const total = ctx.startY + event.translationY;
      console.log('translateY', total);

      if (total < CALENDAR_HEIGHT) {
        translationY.value = total;
      } else {
        translationY.value = CALENDAR_HEIGHT;
      }

      if (total < 0) {
        translationY.value = 0;
      }
    },
    onEnd: () => {
      if (translationY.value >= MANURAL_SCROLL) {
        translationY.value = withTiming(0, {duration: 200}, finished => {
          if (finished) runOnJS(setToggleGesture)(false);
        });
      }
      if (translationY.value === 0) {
        runOnJS(setToggleGesture)(false);
      }
    },
  });

  const animatedSpace = useAnimatedStyle(() => {
    return {
      height: translationY.value,
    };
  });

  const calendarTranslate = useAnimatedStyle(() => {
    const translate = interpolate(
      translationY.value,
      [0, CALENDAR_HEIGHT],
      [-CALENDAR_HEIGHT, 0],
    );
    return {
      transform: [{translateY: translate}],
    };
  });

  const toggleCalendar = () => {
    translationY.value = withTiming(
      translationY.value ? 0 : CALENDAR_HEIGHT,
      {duration: 200},
      finished => {
        if (finished) runOnJS(setToggleGesture)(!toggleGesture);
      },
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{overflow: 'hidden'}}>
        {/* GESTURE SECTION */}
        {toggleGesture && (
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={styles.gesture}></Animated.View>
          </PanGestureHandler>
        )}

        {/* MENU SECTION */}
        <TouchableWithoutFeedback onPress={toggleCalendar}>
          <View style={styles.menu}>
            <Text style={styles.heading}>MENU</Text>
          </View>
        </TouchableWithoutFeedback>

        {/* CALENDAR SECTION */}
        <Animated.View style={[styles.calendar, calendarTranslate]}>
          <Text style={styles.heading}>CALENDAR</Text>
        </Animated.View>

        {/* SPACE */}
        <Animated.View style={animatedSpace} />

        <FlatList
          data={[
            1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 7, 8, 9, 8, 7, 6, 5, 5,
          ]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <View style={styles.listItem}>
              <Text style={styles.itemText}>{index + 1}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  menu: {
    height: MENU_HEIGHT,
    backgroundColor: '#00ABB3',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  gesture: {
    position: 'absolute',
    top: MENU_HEIGHT + CALENDAR_HEIGHT,
    left: 0,
    height: GESTURE_SECTION_HEIGHT,
    width: '100%',
    backgroundColor: 'green',
    zIndex: 99999,
  },
  calendar: {
    height: CALENDAR_HEIGHT,
    backgroundColor: '#3C4048',
    position: 'absolute',
    top: MENU_HEIGHT,
    left: 0,
    width: '100%',
    zIndex: -1,

    justifyContent: 'center',
    alignItems: 'center',
    // zIndex: 999,
  },
  listItem: {
    height: 50,
    backgroundColor: '#EAEAEA',
    marginBottom: 13,
  },
  itemText: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  heading: {fontSize: 25, fontWeight: 'bold', color: 'white'},
});
