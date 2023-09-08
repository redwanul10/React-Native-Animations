import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Image, StyleSheet, FlatList, Pressable} from 'react-native';
import Animated from 'react-native-reanimated';

export const items = [
  {
    title: 'Papaya',
    id: 'fwewerw',
    image:
      'https://vegina-store.myshopify.com/cdn/shop/products/27_600X700_crop_center.jpg?v=1620641889',
    price: '$9.00',
  },
  {
    title: 'Blackberries',
    id: 'mj7294j',
    image:
      'https://vegina-store.myshopify.com/cdn/shop/products/11_63bd7f85-bfa5-4d43-b09f-d5b24e398ef6_600X700_crop_center.jpg?v=1620641903',

    price: '$19.00',
  },
  {
    title: 'Cauliflower',
    id: '378jhjdheh',
    image:
      'https://vegina-store.myshopify.com/cdn/shop/products/4_e3af2cd6-0f26-42a3-8071-42cae821c669_600X700_crop_center.jpg?v=1620644020',
    price: '$15.00',
  },
  {
    title: 'Avocado',
    id: 'sjdjw7293',
    image:
      'https://vegina-store.myshopify.com/cdn/shop/products/3_f7390f79-2601-4bf0-a996-6635b67d28c7_600X700_crop_center.jpg?v=1620644039',
    price: '$4.00',
  },
];
export default function ProductList() {
  const navigation = useNavigation();
  return (
    <View style={{marginTop: 20, backgroundColor: '#f9f9f9'}}>
      <FlatList
        data={items}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={<View style={{width: 10}} />}
        renderItem={({item, index}) => (
          <Pressable
            onPress={() =>
              navigation.navigate('Screen2', {
                tagName: `sharedTag${index}`,
                productInfo: item,
              })
            }>
            <Animated.View style={styles.row}>
              <Animated.Image
                style={{width: 100, height: 100}}
                sharedTransitionTag={`sharedTag${index}`}
                source={{
                  uri: item.image,
                }}
              />
              <View style={{paddingHorizontal: 10}}>
                <Text style={styles.highlight}>{item.title}</Text>
                <Text style={{marginVertical: 4, marginBottom: 8}}>
                  Easily gluten free
                </Text>
                <Text style={styles.highlight}>{item.price}</Text>
              </View>
              <Text style={styles.tag}>Top</Text>
            </Animated.View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    // marginBottom: 5,
  },
  highlight: {
    fontWeight: 'bold',
  },
  tag: {
    backgroundColor: '#8bda60',
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 5,
    position: 'absolute',
    right: 0,
    overflow: 'hidden',
  },
});
