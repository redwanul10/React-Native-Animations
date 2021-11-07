/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import type { Node } from 'react';
import {
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
// AIzaSyBKcNFdxwacUQZAmCPZtjql7jXwM17B25Y
import axios from 'axios';
const KEY = 'AIzaSyBKcNFdxwacUQZAmCPZtjql7jXwM17B25Y';

const youtube = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet',
    maxResults: 20,
    key: KEY
  }
})

const App: () => Node = () => {
  const [selectedVideo, setSelectedVideo] = useState(false)
  const [bottomPosition, setBottomPosition] = useState(0)
  const [videos, setVideos] = useState([])


  const getVideos = async () => {
    let res = await youtube.get('/search', {
      params: {
        q: "react js "
      }
    })
    setVideos(res?.data?.items)
    // console.log(JSON.stringify(res?.data, null, 2))
  }

  useEffect(() => {
    getVideos()
  }, [])
  console.log("sdlkfjskldjflsk ", JSON.stringify(videos[0], null, 2))
  return (
    <>
      <View style={{ flex: 1 }} >
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
      </View>
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
