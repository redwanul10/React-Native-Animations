import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import TextAvatar from './textAvatar';

const Card = ({title, subTitle, description, avatarText, avatarColor}) => {
  return (
    <View style={style.row}>
      <TextAvatar
        size={38}
        fontSize={18}
        text={avatarText}
        color={avatarColor}
      />
      <View style={style.mailText}>
        <Text style={[style.title, style.bold]}>{title}</Text>
        <Text style={[style.subTitle, style.bold]} numberOfLines={1}>
          {subTitle}
        </Text>
        <Text style={[style.subTitle]} numberOfLines={1}>
          {description}
        </Text>
      </View>
    </View>
  );
};

export default Card;

const style = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  mailText: {
    marginLeft: 15,
    width: '80%',
  },
  bold: {
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
  },
  subTitle: {
    fontSize: 13,
  },
});
