import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

const Chat = ({title, description, photo, time}) => {
  return (
    <View style={style.row}>
      <Image source={{uri: photo}} style={style.photo} />
      <View style={style.mailText}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={[style.title, style.bold]}>{title}</Text>
          <Text style={[style.subTitle, {fontSize: 12}]}>{time}</Text>
        </View>

        <Text style={[style.subTitle]} numberOfLines={1}>
          {description}
        </Text>
      </View>
    </View>
  );
};

export default Chat;

const style = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
    height: '100%',
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
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 13,
    color: 'gray',
  },
  photo: {width: 45, height: 45, borderRadius: 30},
});
