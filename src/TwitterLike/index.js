import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Header from './header';
import Tweet from './tweet';
import {ScrollView} from 'react-native-gesture-handler';

const tweets = [
  {
    name: 'Victor Noguera',
    userName: '@nvictorme',
    profilePic:
      'https://sb.kaleidousercontent.com/67418/1920x1545/c5f15ac173/samuel-raita-ridxdghg7pw-unsplash.jpg',
    description: `The State of React Native 2022 results ARE OUT! 🎉 We've designed this survey to help you make better decisions for your current and future React Native projects. Check the results to see:`,
    Comments: 8,
    retweets: 63,
    likes: 127,
  },
  {
    name: 'Minh-Phuc Tran',
    userName: '@thymikee',
    profilePic:
      'https://assets.zoom.us/images/en-us/desktop/generic/virtual-background-green-screen-example.jpg',
    description: `hey global @reactjs community. we need a little help. we’d like to feature a few community photos from React conferences or meetups on our site. if you have photos that you own the rights to (!!!) and would like to donate for our site, please reply with them! we’ll pick and DM.`,
    Comments: 63,
    retweets: 17,
    likes: 35,
  },

  {
    name: 'Michał Pierzchała',
    userName: '@inkdrop_app',
    profilePic:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsQ-YHX2i3RvTDDmpfnde4qyb2P8up7Wi3Ww&usqp=CAU',
    description: 'New Vue Router docs are live 🌟',
    photo:
      "'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/9/16ee821475749f36~tplv-t2oaga2asx-image.image'",
    Comments: 28,
    retweets: 3,
    likes: 6,
  },
];

export default function TwitterLikeAnimation() {
  return (
    <>
      <Header />
      <View style={styles.container}>
        <ScrollView>
          {tweets.map((data, index) => (
            <Tweet details={data} key={index} />
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
});
