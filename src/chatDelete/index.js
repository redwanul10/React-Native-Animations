import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DeleteIcon from './deleteIcon';
import Chat from './chat';
import LinearGradient from 'react-native-linear-gradient';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Swipable from './swipable';

const data = [
  {
    id: 1,
    photo:
      'https://media-exp1.licdn.com/dms/image/C5603AQE-vA--43mj7g/profile-displayphoto-shrink_100_100/0/1550971822403?e=1671667200&v=beta&t=8NURm7MGVCQDksTmb54il9TK_Z9Kgyeop9xG2ztqqD8',
    title: 'Sayaka Ono',
    // subTitle: 'Tk. 70 off home made meals! ',
    avatarText: 'F',
    avatarColor: '#f51b53',
    description: 'Hi Dux, How are you today ?',
  },
  {
    id: 2,
    title: 'Sarina Sajadi',
    photo:
      'https://media-exp1.licdn.com/dms/image/C5603AQEwldxEowRyOg/profile-displayphoto-shrink_100_100/0/1641499615043?e=1671667200&v=beta&t=OB43yX8WHlHmMesVW3u1n9FuCVyAYt99IPs6u0NSi6g',
    // subTitle: 'Tk. 70 off home made meals! ',
    avatarText: 'F',
    avatarColor: '#f51b53',
    description: 'Hi Dux, How are you today ?',
  },
  {
    id: 3,
    title: 'David Glauber',
    photo:
      'https://media-exp1.licdn.com/dms/image/C5603AQGo71PDTejH3A/profile-displayphoto-shrink_100_100/0/1578381122645?e=1671667200&v=beta&t=2InLWvvAB1eJElvEQeuosx-mK3BtBX7XgWwuaYryMlc',
    // subTitle: 'Tk. 70 off home made meals! ',
    avatarText: 'F',
    avatarColor: '#f51b53',
    description: 'Hi Dux, How are you today ?',
  },
  {
    id: 4,
    title: 'Monarch WadiaView',
    photo:
      'https://media-exp1.licdn.com/dms/image/C4D03AQGN2KmXvw6CGg/profile-displayphoto-shrink_100_100/0/1637640642044?e=1671667200&v=beta&t=YZcTC-SSGn8OCD5RWvceMMOOnWmYJqafX3tlM1kA83M',
    // subTitle: 'Tk. 70 off home made meals! ',
    avatarText: 'F',
    avatarColor: '#f51b53',
    description: 'Hi Dux, How are you today ?',
  },
  {
    id: 5,
    title: 'Jack ForgeView',
    photo:
      'https://media-exp1.licdn.com/dms/image/C4E03AQFzijW3X3GD_Q/profile-displayphoto-shrink_100_100/0/1616692227562?e=1671667200&v=beta&t=Bwo-H0ovvyRqV_8PR1o3tPpvn8d_s7QHSdVfwJ_zIjA',
    // subTitle: 'Tk. 70 off home made meals! ',
    avatarText: 'F',
    avatarColor: '#f51b53',
    description: 'Hi Dux, How are you today ?',
  },
];

export default function DeleteChat() {
  const [selectedIndex, setSelectedIndex] = useState(undefined);
  const [conversations, setConversations] = useState(data);
  const [counter, setCounter] = useState(0);

  const handleDelete = (title, isApplicable) => {
    if (!isApplicable) return;
    // if (selectedIndex === undefined || !isApplicable) return;
    const filteredList = conversations.filter(item => item.title !== title);
    // setConversations(filteredList);
    // setSelectedIndex(undefined);
    // setCounter(oldC => oldC + 1);
    console.log('called === ', title);
    console.log('length === ', filteredList.length);

    setConversations(filteredList);
  };

  // useEffect(() => {
  //   if (selectedIndex === undefined) return;
  //   const filteredList = conversations.filter(
  //     (item, index) => index !== selectedIndex,
  //   );
  //   setConversations(filteredList);
  // }, [selectedIndex]);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#32c596', '#2faaab']}
        style={{height: 130}}
      />

      {/* <SafeAreaView style={{flex: 1}}> */}
      {/* <Text>DeleteChat</Text>
        <View style={{}}>
          <DeleteIcon />
        </View> */}

      <View style={styles.container}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatTxt}>
            Chat
            {/* {conversations.length} = {counter} */}
          </Text>
          <AntIcon name="plus" size={25} color="#4283d7" />
        </View>

        <FlatList
          data={conversations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <>
              <Swipable
                index={index}
                {...item}
                initialHeight={60}
                backgroundColor={item.avatarColor}
                handleDelete={handleDelete}
                setSelectedIndex={setSelectedIndex}
                selectedIndex={selectedIndex}
                // totalConversation={conversations.length}
                totalConversation={counter}>
                <Chat {...item} />
              </Swipable>
            </>
          )}
        />
      </View>
      {/* <Text>{JSON.stringify(conversations, null, 2)}</Text> */}

      {/* </SafeAreaView> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -30,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  chatTxt: {fontSize: 25, fontWeight: 'bold'},
});
