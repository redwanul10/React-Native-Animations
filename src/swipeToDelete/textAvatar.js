import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const TextAvatar = ({text, color, size, fontSize}) => {
  const avatarWidth = size || 30;
  return (
    <View
      style={[
        style.avatarContainer,
        {
          backgroundColor: color,
          width: avatarWidth,
          height: avatarWidth,
        },
      ]}>
      <Text style={[style.avatar, {fontSize: fontSize || 14}]}>{text}</Text>
    </View>
  );
};

export default TextAvatar;

const style = StyleSheet.create({
  avatar: {
    color: 'white',
  },
  avatarContainer: {
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
