import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function Tabs() {
  return (
    <View style={{flexDirection: 'row'}}>
      <Text style={styles.tab}>All</Text>
      <Text style={styles.tab}>News</Text>
      <Text style={styles.tab}>Music</Text>
      <Text style={styles.tab}>Programming</Text>
      <Text style={styles.tab}>Javascript</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tab: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginRight: 5,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
});
