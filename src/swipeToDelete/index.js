import {View, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import Header from './header';
import Card from './card';
import Swipable from './swipable';
import {FlatList} from 'react-native-gesture-handler';

const data = [
  {
    title: 'foodpanda',
    subTitle: 'Tk. 70 off home made meals! ',
    avatarText: 'F',
    avatarColor: '#219F94',
    description: 'Lorem Ipsum is simply dummy text of the printing and typese',
  },
  {
    title: 'Codementor',
    subTitle: 'Is becoming an engineering manager right for you?',
    avatarText: 'C',
    avatarColor: '#C1DEAE',
    description: 'Lorem Ipsum is simply dummy text of the printing and typese',
  },
  {
    title: 'Quora Digest',
    subTitle: 'Is becoming an engineering manager right for you?',
    avatarText: 'Q',
    avatarColor: '#313552',
    description: 'Lorem Ipsum is simply dummy text of the printing and typese',
  },
  {
    title: 'Coursera',
    subTitle: 'Trending this week at Coursera',
    avatarText: 'C',
    avatarColor: '#2EB086',
    description: 'Lorem Ipsum is simply dummy text of the printing and typese',
  },
  {
    title: 'Codementor',
    subTitle: 'Is becoming an engineering manager right for you?',
    avatarText: 'C',
    avatarColor: '#96CEB4',
    description: 'Lorem Ipsum is simply dummy text of the printing and typese',
  },
  {
    title: 'foodpanda',
    subTitle: 'Tk. 70 off home made meals! ',
    avatarText: 'F',
    avatarColor: '#FFEEAD',
    description: 'Lorem Ipsum is simply dummy text of the printing and typese',
  },
  {
    title: 'Codementor',
    subTitle: 'Is becoming an engineering manager right for you?',
    avatarText: 'C',
    avatarColor: '#D9534F',
    description: 'Lorem Ipsum is simply dummy text of the printing and typese',
  },
  {
    title: 'Quora Digest',
    subTitle: 'Is becoming an engineering manager right for you?',
    avatarText: 'Q',
    avatarColor: '#FFAD60',
    description: 'Lorem Ipsum is simply dummy text of the printing and typese',
  },
  {
    title: 'Coursera',
    subTitle: 'Trending this week at Coursera',
    avatarText: 'C',
    avatarColor: '#CCD1E4',
    description: 'Lorem Ipsum is simply dummy text of the printing and typese',
  },
  {
    title: 'Codementor',
    subTitle: 'Is becoming an engineering manager right for you?',
    avatarText: 'C',
    avatarColor: '#FE7E6D',
    description: 'Lorem Ipsum is simply dummy text of the printing and typese',
  },
  {
    title: 'foodpanda',
    subTitle: 'Tk. 70 off home made meals! ',
    avatarText: 'F',
    avatarColor: '#FFEEAD',
    description: 'Lorem Ipsum is simply dummy text of the printing and typese',
  },
  {
    title: 'Codementor',
    subTitle: 'Is becoming an engineering manager right for you?',
    avatarText: 'C',
    avatarColor: '#D9534F',
    description: 'Lorem Ipsum is simply dummy text of the printing and typese',
  },
  {
    title: 'Quora Digest',
    subTitle: 'Is becoming an engineering manager right for you?',
    avatarText: 'Q',
    avatarColor: '#FFAD60',
    description: 'Lorem Ipsum is simply dummy text of the printing and typese',
  },
  {
    title: 'Coursera',
    subTitle: 'Trending this week at Coursera',
    avatarText: 'C',
    avatarColor: '#CCD1E4',
    description: 'Lorem Ipsum is simply dummy text of the printing and typese',
  },
  {
    title: 'Codementor',
    subTitle: 'Is becoming an engineering manager right for you?',
    avatarText: 'C',
    avatarColor: '#FE7E6D',
    description: 'Lorem Ipsum is simply dummy text of the printing and typese',
  },
];

const SwipeToDelete = () => {
  return (
    <>
      <SafeAreaView style={style.container}>
        <View style={{paddingHorizontal: 10, paddingTop: 40}}>
          <Header />
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <>
                <Swipable backgroundColor={item.avatarColor}>
                  <Card {...item} />
                </Swipable>
              </>
            )}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default SwipeToDelete;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
