import {Text, SafeAreaView, StyleSheet, StatusBar, View} from 'react-native';
import React, {useState} from 'react';
import {FlatList, PanGestureHandler} from 'react-native-gesture-handler';
import RecipeCard from './recipeCard';
import Icon from 'react-native-vector-icons/Ionicons';
import Lottie from 'lottie-react-native';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  scrollTo,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import TabBar from './tabBar';

const data = [
  {
    id: 2,
    photo:
      'https://images.unsplash.com/photo-1613747526070-31ccc300ec07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    title: 'Milky Blueberry Ice Cream with Vanilla Essence',
    animated: false,
    categories: ['Cheese', 'Dry Food', 'Ice Cream'],
  },
  {
    id: 3,
    photo:
      'https://pivoo.themepreview.xyz/home-four/wp-content/uploads/sites/5/2020/10/eiliv-sonas-aceron-Q-5eUQwEqm0-unsplash-592x665.jpg',

    title: 'Puerto Rican Salmorejo (Tomatoes with Rice)',
    animated: false,
    categories: ['Rice', 'Vegetable', 'Dry Food'],
  },
  {
    id: 4,
    photo:
      'https://media.istockphoto.com/photos/image-of-muffin-baking-tray-with-rows-of-homemade-apple-muffins-in-picture-id1318467379?b=1&k=20&m=1318467379&s=170667a&w=0&h=wheMYpblwnHfVRKsiV5e5b7wBqXMQ4ps-ADGv3d0-BQ=',
    title: 'Vanilla Cupcake Recipe',
    animated: false,
    categories: ['Dry Food'],
  },
  {
    id: 1,
    photo:
      'https://pivoo.themepreview.xyz/home-four/wp-content/uploads/sites/5/2020/10/louis-hansel-shotsoflouis-LIJujhJviMI-unsplash-592x665.jpg',
    title: 'Keema Aloo (Beef and Potatoes) with Sizzling Vegetables',
    animated: false,
    categories: ['Desert', 'Dry Food', 'Rice'],
  },
];

const REFRESH_AREA_HEIGHT = 130;

export default function PullToRefresh() {
  const [recipes, setRecipes] = useState(data);
  const [toggleLottie, setToggleLottie] = useState(false);
  const [toggleGesture, setToggleGesture] = useState(true);
  const [gestureActive, setGestureActive] = useState(false);

  const flatlistRef = useAnimatedRef();

  const translationY = useSharedValue(0);
  const pullUpTranslate = useSharedValue(0);

  const fetchData = () => {
    setTimeout(() => {
      setRecipes([
        {
          id: new Date().getTime(),
          photo:
            'https://pivoo.themepreview.xyz/home-four/wp-content/uploads/sites/5/2020/10/rebecca-aldama-0zgNo99FYLk-unsplash-592x665.jpg',
          title:
            'Blastica Beef Burger with Capsicum Fillet with Broccoli & Spinach',
          animated: true,
          categories: ['Vegetables'],
        },
        ...recipes,
      ]);
    }, 2000);

    setTimeout(() => {
      translationY.value = withTiming(0, {duration: 200}, finished => {
        pullUpTranslate.value = 0;

        runOnJS(setToggleLottie)(false);
      });
    }, 3000);
  };

  const pullUpAnimation = () => {
    pullUpTranslate.value = withDelay(
      0,
      withTiming(
        pullUpTranslate.value === 0 ? -100 : 0,
        {duration: 200},
        finished => {
          if (finished) {
            runOnJS(setToggleLottie)(true);
            runOnJS(fetchData)();
          }
        },
      ),
    );
  };
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = translationY.value;
      runOnJS(setGestureActive)(true);
    },
    onActive: (event, ctx) => {
      const total = ctx.startY + event.translationY;
      // console.log('translateY', total);

      if (total < REFRESH_AREA_HEIGHT) {
        translationY.value = total;
      } else {
        translationY.value = REFRESH_AREA_HEIGHT;
      }

      if (total < 0) {
        translationY.value = 0;
        scrollTo(flatlistRef, 0, total * -1, false);
      }
    },
    onEnd: () => {
      runOnJS(setGestureActive)(false);
      if (translationY.value <= REFRESH_AREA_HEIGHT - 1) {
        translationY.value = withTiming(0, {duration: 200});
      } else {
        runOnJS(pullUpAnimation)();
      }
      if (!(translationY.value > 0)) {
        runOnJS(setToggleGesture)(false);
      }
    },
  });

  const handleOnScroll = event => {
    const position = event.nativeEvent.contentOffset.y;
    if (position === 0) {
      setToggleGesture(true);
    } else if (position > 0 && toggleGesture && !gestureActive) {
      setToggleGesture(false);
    }
  };

  const animatedSpace = useAnimatedStyle(() => {
    return {
      height: translationY.value,
    };
  });

  const pullDownIconSection = useAnimatedStyle(() => {
    const rotate = interpolate(
      translationY.value,
      [0, REFRESH_AREA_HEIGHT],
      [0, 180],
    );
    return {
      transform: [{rotate: `${rotate}deg`}],
    };
  });

  const pullUpTranslateStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translationY.value,
      [58, REFRESH_AREA_HEIGHT],
      [0, 1],
    );

    return {
      opacity,
      transform: [
        {
          translateY: pullUpTranslate.value,
        },
      ],
    };
  });

  const statusBarStyle = useAnimatedStyle(() => {
    const translate = interpolate(
      translationY.value,
      [80, REFRESH_AREA_HEIGHT],
      [0, -40],
      {extrapolateLeft: Extrapolate.CLAMP, extrapolateRight: Extrapolate.CLAMP},
    );

    return {
      transform: [
        {
          translateY: translate,
        },
      ],
    };
  });

  return (
    <>
      <StatusBar
        translucent={true}
        // backgroundColor="#E0144C"
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <Animated.View
        style={[{height: 40, backgroundColor: '#E0144C'}, statusBarStyle]}
      />

      <SafeAreaView style={{flex: 1, marginHorizontal: 15, marginVertical: 15}}>
        <Animated.View style={[styles.pullToRefreshArea, animatedSpace]}>
          <Animated.View
            style={[
              {justifyContent: 'center', alignItems: 'center'},
              pullUpTranslateStyle,
            ]}>
            <Animated.View style={pullDownIconSection}>
              <Icon name="arrow-down-circle" color="black" size={35} />
            </Animated.View>

            <Text>Pull Down to Refresh</Text>
          </Animated.View>
          {toggleLottie && (
            <>
              <Lottie
                source={require('./circlesRotate.json')}
                style={styles.lottieView}
                autoPlay
              />
            </>
          )}
        </Animated.View>

        <FlatList
          data={recipes}
          ref={flatlistRef}
          onScroll={handleOnScroll}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => <RecipeCard item={item} />}
        />

        {toggleGesture && (
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={styles.gesture}></Animated.View>
          </PanGestureHandler>
        )}

        <TabBar />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  catagory: {
    marginRight: 20,
    fontWeight: 'bold',
  },
  active: {
    width: 70,
    height: 2,
    backgroundColor: 'black',
    marginBottom: 20,
  },
  catagoryContainer: {flexDirection: 'row', marginBottom: 5, marginTop: 30},
  lottieAnim: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    position: 'absolute',
    left: -8,
    top: -8,
  },
  gesture: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 200,
    width: '100%',
    // backgroundColor: 'green',
    zIndex: 99999,
  },
  lottieView: {
    width: 80,
    height: 80,
    backgroundColor: 'transparent',
    marginTop: -15,
  },
  pullToRefreshArea: {
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    overflow: 'hidden',
  },
});
