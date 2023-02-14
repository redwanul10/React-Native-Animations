/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Slider from './src/slider/slider';
import WhatsappHeader from './src/whatsAppSearch';
import SwipeToDelete from './src/swipeToDelete';
import BkashPayment from './src/bKashPayment';
import AddToCart from './src/addToCart';
import ProductPage from './src/addToCart/productPage';
import DeleteChat from './src/chatDelete';
import GoogleCalendar from './src/googleCalendar';
import Youtube from './src/youtube';
import {View, Text, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

// import PullToRefresh from './src/pullToRefresh';

global.__reanimatedWorkletInit = () => {};

const AnimationComponents = [
  'Slider',
  'Whatsapp Header',
  'Swipe To Delete',
  'Bkash Payment',
  'Product Page',
  'Delete Chat',
  'Google Calendar',
];

const App = () => {
  const [selectedTopic, setSelectedTopic] = React.useState(null);

  if (selectedTopic) {
    switch (selectedTopic) {
      case 'Slider':
        return <Slider closeComponent={() => setSelectedTopic(null)} />;
      case 'Whatsapp Header':
        return <WhatsappHeader closeComponent={() => setSelectedTopic(null)} />;
      case 'Swipe To Delete':
        return <SwipeToDelete closeComponent={() => setSelectedTopic(null)} />;
      case 'Bkash Payment':
        return <BkashPayment closeComponent={() => setSelectedTopic(null)} />;
      case 'Product Page':
        return <ProductPage closeComponent={() => setSelectedTopic(null)} />;
      case 'Delete Chat':
        return <DeleteChat closeComponent={() => setSelectedTopic(null)} />;
      case 'Google Calendar':
        return <GoogleCalendar closeComponent={() => setSelectedTopic(null)} />;
      case 'Youtube':
        return <Youtube closeComponent={() => setSelectedTopic(null)} />;
      default:
        return <Slider closeComponent={() => setSelectedTopic(null)} />;
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {AnimationComponents.map((item, index) => {
        return (
          <Pressable
            key={index.toString()}
            onPress={() => setSelectedTopic(item)}
            style={{
              padding: 20,
              borderBottomWidth: 1,
              borderBottomColor: '#dcdcdc',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#000',
                marginRight: 20,
              }}>
              👉
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#000',
              }}>
              {`${index + 1}. ${item}`}
            </Text>
          </Pressable>
        );
      })}
    </SafeAreaView>
  );
};

export default App;
