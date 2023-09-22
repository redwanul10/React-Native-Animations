import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';

const AnimationComponents = [
  'Slider',
  'Whatsapp Header',
  'Swipe To Delete',
  'Bkash Payment',
  'Product Page',
  'Delete Chat',
  'Google Calendar',
  'Pull to Refresh',
  'Youtube Player',
  'Twitter Like',
  'Swipe Slider',
  'Ecommerce Shared Element Transision',
];

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        {AnimationComponents.map((item, index) => {
          return (
            <Pressable
              key={index.toString()}
              onPress={() => navigation.navigate(item)}
              style={styles.menuItem}>
              <Text style={styles.menuItemIcon}>👉</Text>
              <Text style={styles.menuItemName}>{`${index + 1}. ${item}`}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  menuItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 20,
  },
  menuItemName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});
