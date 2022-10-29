import {View, Text, ImageBackground, StyleSheet, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const IS_ANDROID = Platform.OS === 'android';

export default function RecipeCard({item}) {
  const opacity = useSharedValue(item.animated ? 0 : 1);

  useEffect(() => {
    if (item.animated) {
      // opacity.value = 0;
      opacity.value = withTiming(1, {duration: 300});
    }
  }, [opacity, item.animated]);

  const opacityStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      style={[
        {marginBottom: 10, borderRadius: 10, overflow: 'hidden'},
        opacityStyle,
      ]}>
      <ImageBackground
        resizeMode="cover"
        source={{
          uri: item.photo,
        }}>
        <LinearGradient colors={['rgba(26, 23, 43, 0)', '#1b1816']}>
          <View style={styles.flexEnd}>
            <View style={styles.categoryRow}>
              {item.categories.map(categoryName => (
                <Text style={styles.category}>{categoryName}</Text>
              ))}
              {/* <Text style={styles.category}>Desert</Text>
              <Text style={styles.category}>Dry Food</Text>
              <Text style={styles.category}>Rice</Text> */}
            </View>
            <Text style={styles.title}>{item.title}</Text>

            <View style={styles.dateSection}>
              <Icon
                name="clockcircleo"
                color="rgba(255, 255, 255,0.7)"
                size={15}
              />
              <Text style={styles.date}>October 11,2022</Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: IS_ANDROID ? 8 : 10,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  category: {
    color: 'white',
    marginHorizontal: 5,
    fontWeight: 'bold',
    // backgroundColor: 'rgba(255,51,102,1.00)',
    // backgroundColor: 'gray',
    backgroundColor: 'rgba(224, 20, 76,0.5)',

    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 3,
    fontSize: 10,
    overflow: 'hidden',
  },
  dateSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  date: {
    fontSize: 14,
    color: 'rgba(255, 255, 255,0.7)',
    textAlign: 'center',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  flexEnd: {
    width: '100%',
    height: 230,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 25,
    justifyContent: 'flex-end',
    borderRadius: 20,
  },
});
