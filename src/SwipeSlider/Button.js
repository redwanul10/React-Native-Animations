import {Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';

export default function Button({title, onPress, radius = 0}) {
  return (
    <Pressable
      style={[styles.btnContainter, {borderRadius: radius}]}
      onPress={onPress}>
      <Text style={styles.btnText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btnContainter: {
    color: 'white',
    backgroundColor: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    // borderRadius: 10,
    // overflow: 'hidden',
    width: '100%',
    // marginTop: 20,
    paddingVertical: 20,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
