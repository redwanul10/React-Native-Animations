import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import TweetActionButtons from './TweetActionButtons';

export default function Tweet({details}) {
  const {
    description,
    photo,
    profilePic,
    name,
    userName,
    Comments,
    retweets,
    likes,
  } = details;

  return (
    <View style={[styles.row, {marginVertical: 20}]}>
      <Image
        style={styles.profilePic}
        source={{
          uri: profilePic,
        }}
      />
      <View style={{flex: 1}}>
        <View style={styles.row}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>{name}</Text>
          <Text style={{color: 'gray', marginLeft: 7, fontSize: 16}}>
            {userName} - 3h
          </Text>
        </View>
        <View style={{marginTop: 5}}>
          <Text>{description}</Text>
          {photo ? (
            <View style={styles.tweetImageContainer}>
              <Image
                style={styles.tweetImg}
                source={{
                  uri: 'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/9/16ee821475749f36~tplv-t2oaga2asx-image.image',
                }}
              />
            </View>
          ) : null}
        </View>
        <TweetActionButtons
          Comments={Comments}
          retweets={retweets}
          likes={likes}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  profilePic: {
    width: 55,
    height: 55,
    borderRadius: 55,
    marginRight: 10,
  },
  tweetImageContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgb(207, 217, 222)',
    marginTop: 10,
    borderRadius: 10,
  },
  tweetImg: {
    width: '100%',
    height: 260,
    resizeMode: 'contain',
    borderRadius: 10,
  },
});
