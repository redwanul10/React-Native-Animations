import {Pressable, View} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {OPEN_HEIGHT, HEIGHT} from './Cart';
import {FakeImage} from './FakeImage';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function FakeCartItems({
  translateX,
  setToggle,
  toggle,
  handleOpen,
  data,
  start,
  notify,
  visible,
  setVisible,
}) {
  const ItemsContainerStyle = useAnimatedStyle(() => {
    const value = interpolate(translateX.value, [OPEN_HEIGHT, 0], [-192, 0], {
      extrapolateLeft: Extrapolate.CLAMP,
      extrapolateRight: Extrapolate.CLAMP,
    });

    return {
      transform: [{translateY: value}],
    };
  });

  return (
    <AnimatedPressable
      style={[
        {position: 'absolute', width: '100%', top: 192},
        ItemsContainerStyle,
      ]}
      onPress={() => {
        setToggle(!toggle);
        handleOpen(0);
      }}>
      <View style={{flexDirection: 'row'}}>
        {[...data.slice(0, 3)].map((item, index) => (
          <FakeImage
            key={index}
            index={index}
            item={item}
            animatedValue={start.value}
            start={toggle}
            notify={notify}
            translate={translateX}
            onEnd={() => {
              if (!visible && translateX.value !== HEIGHT) setVisible(true);
            }}
          />
        ))}
      </View>
    </AnimatedPressable>
  );
}
