import {View, Text} from 'react-native';
import React, {useState} from 'react';
import VideoCard from './videoCard';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from './header';
import Tabs from './tabs';
import {ScrollView} from 'react-native-gesture-handler';
import TabBar from './tabBar';
import YoutubePlayer from './youtubePlayer';

const list = [
  {
    channelLogo:
      'https://yt3.ggpht.com/ytc/AL5GRJWhzi26YnOvIsPfOTBEQkx8VaNUuieO-4ypxg4I7A=s88-c-k-c0x00ffffff-no-rj',
    thumbnail:
      'https://i.ytimg.com/vi/cu5BZNymMzs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD9uEFytdrh6GT6-VYv5qYmJEoFKg',
    title: 'Top 10 Places To Visit in 2023 (Year of Travel)',
    channelTitle: 'Ryan Shirley   150k views  3 months ago',
    channelName: 'Ryan Shirley',
  },
  {
    channelLogo:
      'https://yt3.ggpht.com/ytc/AL5GRJW7czusk8AGmQ7x6BlqqcMIa7OyT0KiLWjX_gZz=s88-c-k-c0x00ffffff-no-rj',
    thumbnail:
      'https://i.ytimg.com/vi/3SsK-cxlj_w/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAjMmnCBoyv4e82SvmOO5CcJPuFkw',
    title: '25 Greatest Natural Wonders of the World - Travel Video',
    channelTitle: 'touropia   19m views  3 years ago',
    channelName: 'touropia',
  },
  {
    channelLogo:
      'https://yt3.ggpht.com/vVNRN2owIpF1EKhfENoMhDRwNNXHDjL1o_6oG3K13aMlu3dyl4DZuWkq_oAv8an-B1D5Mzbn_UM=s68-c-k-c0x00ffffff-no-rj',
    thumbnail:
      'https://i.ytimg.com/vi/Qmi-Xwq-MEc/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLABaA6pqgUyrWJXKQykGnN_P7pL0g ',
    title: 'Traveling to the Happiest Country in the World!!',
    channelTitle: 'Yes Theory   19m views  3 years ago',
    channelName: 'Yes Theory',
  },
  {
    channelLogo:
      'https://yt3.ggpht.com/ytc/AL5GRJWhzi26YnOvIsPfOTBEQkx8VaNUuieO-4ypxg4I7A=s88-c-k-c0x00ffffff-no-rj',
    thumbnail:
      'https://i.ytimg.com/vi/qertJXj_oBo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBZf_QfeFgRaywjiYnjRB0nmu50Gw',
    title: 'Top 25 Places To Visit In Germany - Travel Guide',
    channelTitle: 'Ryan Shirley   150k views  3 months ago',
    channelName: 'Ryan Shirley ',
  },
];

export default function Youtube() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <Header />
        <Tabs />
        <ScrollView>
          {list.map((item, index) => (
            <VideoCard
              key={index}
              data={item}
              setSelectedVideo={setSelectedVideo}
            />
          ))}
        </ScrollView>
        {selectedVideo && (
          <YoutubePlayer
            selectedVideo={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}
        {/* <TabBar /> */}
      </SafeAreaView>
    </>
  );
}
