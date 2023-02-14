import React from 'react';
import {Pressable} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function CloseIcon({onPress, color = '#fff', style}) {
  return (
    <Pressable
      onPress={onPress}
      style={[{position: 'absolute', right: 20, top: 50, zIndex: 4}, style]}>
      <FontAwesome name="close" size={32} color={color} />
    </Pressable>
  );
}
