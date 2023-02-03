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

// import PullToRefresh from './src/pullToRefresh';

global.__reanimatedWorkletInit = () => {};

const App = () => {
  return (
    <>
      {/* <Slider /> */}
      {/* <WhatsappHeader /> */}
      {/* <SwipeToDelete /> */}
      {/* <BkashPayment /> */}
      {/* <AddToCart /> */}
      {/* <ProductPage /> */}
      {/* <DeleteChat /> */}
      {/* <GoogleCalendar /> */}
      {/* <PullToRefresh /> */}
      <Youtube />
    </>
  );
};

export default App;
