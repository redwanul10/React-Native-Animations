import React from 'react';
import {View, StyleSheet, Text, Dimensions, Image} from 'react-native';

import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const SIZES = Dimensions.get('window');

// IMAGE SIZES
const BIG_IMAGE_SIZE = SIZES.height / 3.2;

const VideoCard = ({data, setSelectedVideo}) => {
  return (
    <View style={{marginBottom: 20}}>
      <TouchableWithoutFeedback
        onPress={() => {
          setSelectedVideo(data);
        }}>
        <View style={styles.playerContainer}>
          <Image
            style={[
              {width: '100%', height: BIG_IMAGE_SIZE, resizeMode: 'contain'},
            ]}
            source={{
              uri:
                data?.thumbnail ||
                'https://i.ytimg.com/vi/duJNVv9m2NY/maxresdefault.jpg',
            }}
          />
        </View>
        <View style={[styles.container]}>
          <View style={[styles.rowCenter, {justifyContent: 'space-between'}]}>
            <View style={styles.rowCenter}>
              <Image
                style={styles.channelLogo}
                source={{
                  uri:
                    data?.channelLogo ||
                    'https://yt3.ggpht.com/ytc/AKedOLR-TP_Uc-gh9UWENj1CsWNVyxDRwCikaVARVwhY=s48-c-k-c0x00ffffff-no-rj',
                }}
              />
              <View style={{flex: 1}}>
                <Text
                  numberOfLines={2}
                  style={{fontWeight: 'bold', fontSize: 16, marginBottom: 5}}>
                  {data?.title}
                </Text>
                <Text>{data?.channelTitle}</Text>
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
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },

  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  playerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  channelLogo: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 50,
  },
});
