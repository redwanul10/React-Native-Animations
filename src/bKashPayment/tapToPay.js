import {View, Text, StyleSheet, Image, useWindowDimensions} from 'react-native';
import React from 'react';

const TapToPay = () => {
  const screenWidth = useWindowDimensions().width;
  return (
    <View style={style.paySection}>
      <Image source={require('./bKash-logo.png')} style={style.bkashLogo} />
      <Text style={style.bottomText}>Tap and hold to Mobile Recharge</Text>
      <View
        style={[
          style.circle,
          {
            width: screenWidth,
            height: screenWidth,
            borderRadius: screenWidth,
            bottom: -screenWidth * 0.65,
          },
        ]}></View>
    </View>
  );
};

export default TapToPay;

const style = StyleSheet.create({
  paySection: {
    // backgroundColor: '#e2136e',
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  bottomText: {
    color: 'white',
    fontSize: 17,
  },
  bkashLogo: {
    width: 80,
    height: 80,
    marginBottom: -10,
  },
  circle: {
    backgroundColor: '#e2136e',
    position: 'absolute',
    zIndex: -1,
    transform: [
      {
        scaleX: 1.3,
      },
    ],
    // left: 0,
  },
});
