import {View, Text, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';

export default function Card({item}) {
  return (
    <View style={[{backgroundColor: 'white', padding: 15, marginBottom: 10}]}>
      {/* Post Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
              marginRight: 8,
              resizeMode: 'contain',
            }}
            source={{
              uri: item.photo,
            }}
          />
          <View>
            <Text style={{fontWeight: 'bold', color: 'black'}}>
              {item.name}
            </Text>
            <Text style={{color: 'gray'}}>July 26 2018, 01:03pm</Text>
          </View>
        </View>
        <Icon name="dots-three-vertical" size={20} color="gray" />
      </View>

      {/* Post Description */}
      <Text style={{color: 'grey', marginTop: 10, marginBottom: 10}}>
        {item.description}
      </Text>

      <Image
        style={{width: '100%', height: 180, borderRadius: 10}}
        source={{
          uri: item.postImage,
        }}
      />

      {/* Post Footer */}
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',

            marginRight: 20,
          }}>
          {item.likes.map(userPhoto => (
            <Image
              style={{width: 30, height: 30, borderRadius: 30, marginRight: -8}}
              source={{
                uri: userPhoto,
              }}
            />
          ))}
        </View>
        <View sty>
          <Text style={{fontWeight: 'bold', color: 'black', fontSize: 12}}>
            Milly, David
          </Text>
          <Text style={{color: 'gray', fontSize: 12}}>
            and 23 more liked this
          </Text>
        </View>
      </View>
    </View>
  );
}
