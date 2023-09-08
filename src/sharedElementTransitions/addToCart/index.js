import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductPage from './ProductPage';
import ProductDetails from './ProductDetails';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CartProvider from './context/CartProvider';

const Stack = createNativeStackNavigator();

export default function SharedElementExample() {
  return (
    <>
      <CartProvider>
        <SafeAreaView style={{backgroundColor: 'black'}}>
          <StatusBar barStyle="light-content" backgroundColor="black" />
        </SafeAreaView>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Screen1" component={ProductPage} />
          <Stack.Screen name="Screen2" component={ProductDetails} />
        </Stack.Navigator>
      </CartProvider>
    </>
  );
}
