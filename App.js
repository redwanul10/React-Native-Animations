/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Platform, StyleSheet} from 'react-native';

import TwitterLikeAnimation from './src/TwitterLike';
import Slider from './src/slider/slider';
import AddToCart from './src/addToCart';
import BkashPayment from './src/bKashPayment';
import DeleteChat from './src/chatDelete';
import GoogleCalendar from './src/googleCalendar';
import PullToRefresh from './src/pullToRefresh';
import SwipeToDelete from './src/swipeToDelete';
import WhatsappHeader from './src/whatsAppSearch';
import Youtube from './src/youtube';
import ProductPage from './src/addToCart/productPage';
import {NavigationContainer} from '@react-navigation/native';
// import {
//   createNativeStackNavigator,
//   TransitionPresets,
// } from '@react-navigation/native-stack';

import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import HomeScreen from './src/HomeScreen';
import SharedElementExample from './src/sharedElementTransitions/addToCart';
import SwipeSlider from './src/SwipeSlider';

const IS_IOS = Platform.OS === 'ios';
const screenOptions = IS_IOS
  ? {}
  : {
      ...TransitionPresets.SlideFromRightIOS,
    };

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={screenOptions}
          // initialRouteName="Pizza Slider"
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Slider" component={Slider} />
          <Stack.Screen
            name="Swipe Slider"
            component={SwipeSlider}
            options={{headerShown: false}}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Whatsapp Header"
            component={WhatsappHeader}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Swipe To Delete"
            component={SwipeToDelete}
          />
          <Stack.Screen name="Bkash Payment" component={BkashPayment} />
          <Stack.Screen
            options={{headerShown: false}}
            name="Ecommerce Shared Element Transision"
            component={SharedElementExample}
          />
          <Stack.Screen name="Product Page" component={ProductPage} />
          <Stack.Screen name="Delete Chat" component={DeleteChat} />
          <Stack.Screen name="Google Calendar" component={GoogleCalendar} />
          <Stack.Screen
            options={{headerShown: false}}
            name="Pull to Refresh"
            component={PullToRefresh}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Youtube Player"
            component={Youtube}
          />
          <Stack.Screen name="Twitter Like" component={TwitterLikeAnimation} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 20,
  },
  menuItemName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default App;
