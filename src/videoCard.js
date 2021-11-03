import React from 'react';
import {View, StyleSheet, Text, Dimensions, Image} from 'react-native';

import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const SIZES = Dimensions.get('window');

// IMAGE SIZES
const BIG_IMAGE_SIZE = SIZES.height / 3.2;

const VideoCard = () => {
  const expandPlayer = () => {};

  return (
    <View style={{marginBottom: 20}}>
      <TouchableWithoutFeedback onPress={expandPlayer}>
        <View style={styles.playerContainer}>
          <Image
            style={[
              {width: '100%', height: BIG_IMAGE_SIZE, resizeMode: 'cover'},
            ]}
            source={{
              uri: 'https://i.ytimg.com/vi/duJNVv9m2NY/maxresdefault.jpg',
            }}
          />
        </View>
        <View style={[styles.container]}>
          <View style={[styles.rowCenter, {justifyContent: 'space-between'}]}>
            <View style={styles.rowCenter}>
              <Image
                style={{width: 50, height: 50, marginRight: 10}}
                source={{
                  uri: 'https://yt3.ggpht.com/ytc/AKedOLR-TP_Uc-gh9UWENj1CsWNVyxDRwCikaVARVwhY=s48-c-k-c0x00ffffff-no-rj',
                }}
              />
              <View style={{flex: 1}}>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>
                  MERN STACK ECOMMERCE WEBSITE REACT, REDUX, EXPRESS, NODE..
                </Text>
                <Text>Traversy Media</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  sideTitle: {
    paddingLeft: 20,
    fontSize: 18,
    color: 'black',
  },
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  iconsContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subBtn: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'red',
    padding: 10,
  },
  playerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
