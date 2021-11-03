/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
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

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Youtube from './src/youtube';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import YoutubePlayer from './src/youtubePlayer';

import VideoCard from './src/videoCard';

const App: () => Node = () => {
  const [show, setShow] = useState(false)
  return (
    <>
      <SafeAreaView style={{ flex: 1 }} >
        <ScrollView>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => setShow(1)}>
              <VideoCard />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShow(2)}>
              <VideoCard />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShow(3)}>
              <VideoCard />
            </TouchableOpacity>
          </View>
        </ScrollView>
        {show && <YoutubePlayer show={show} onClose={() => setShow(false)} />}
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: "yellow" }} ></SafeAreaView>
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
