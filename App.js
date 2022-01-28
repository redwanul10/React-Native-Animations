/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';
import YoutubePlayer from './src/youtubePlayer';
import VideoCard from './src/videoCard';
import Video from 'react-native-video';
// AIzaSyBKcNFdxwacUQZAmCPZtjql7jXwM17B25Y
import axios from 'axios';
import Slider from './src/slider';
import ReanimatedTest from './src/test';
import WhatsappHeader from './src/whatsappHeader';
import SwipeToDelete from './src/swipeToDelete';
const KEY = 'AIzaSyBKcNFdxwacUQZAmCPZtjql7jXwM17B25Y';

const youtube = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet',
    maxResults: 20,
    key: KEY,
  },
});

const App: () => Node = () => {
  const [selectedVideo, setSelectedVideo] = useState(false);
  const [bottomPosition, setBottomPosition] = useState(0);
  const [videos, setVideos] = useState([]);

  const getVideos = async () => {
    try {
      let res = await youtube.get('/search', {
        params: {
          q: 'react js ',
        },
      });
      setVideos(res?.data?.items);
      // console.log(JSON.stringify(res?.data, null, 2))
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  };

  useEffect(() => {
    // getVideos()
  }, []);
  console.log('sdlkfjskldjflsk ', JSON.stringify(videos[0], null, 2));
  return (
    <>
      {/* <Video 
    source={{uri: "https://dafftube.org/wp-content/uploads/2014/01/Sample_1280x720_mp4.mp4"}}   // Can be a URL or a local file.
                                            // Store reference
      //  onBuffer={this.onBuffer}                // Callback when remote video is buffering
       onError={err => console.log("===== err ====",Platform.OS, JSON.stringify(err,null,2))}               // Callback when video cannot be loaded
      paused={false}
       style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }} /> */}

      {/* <View style={{ flex: 1 }} >
        <ScrollView>
          <View style={{ flex: 1 }}>
            {videos?.map(item => {
              return (
                <TouchableOpacity key={item?.id?.videoId} onPress={() => setSelectedVideo(item)}>
                  <VideoCard data={item} />
                </TouchableOpacity>
              )
            })}
          </View>
        </ScrollView>
        <View style={{ height: 1, }}
          onLayout={e => {
            setBottomPosition(e.nativeEvent.layout.y)
          }}
        />
        {selectedVideo && <YoutubePlayer bottomPosition={bottomPosition} selectedVideo={selectedVideo} onClose={() => setSelectedVideo(false)} />}
      </View> */}
      {/* <Slider /> */}
      {/* <WhatsappHeader /> */}
      <SwipeToDelete />
      {/* <ReanimatedTest /> */}
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
