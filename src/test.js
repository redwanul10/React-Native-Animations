import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Animated, {
  set,
  useCode,
  useValue,
  Clock,
  startClock,
  Value,
  Easing,
  timing,
  EasingNode,
  block,
  cond,
  eq,
  not,
  and,
  clockRunning,
  stopClock,
  runOnJS,
} from 'react-native-reanimated';

const success = value => console.log('success ' + value);

const runTiming = (clock, toValue) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    frameTime: new Value(0),
    time: new Value(0),
  };

  const options = {
    toValue: new Value(toValue),
    duration: 2000,
    easing: EasingNode.ease,
  };

  return block([
    timing(clock, state, options),
    cond(eq(state.finished, 1), [
      stopClock(clock),
      set(state.finished, 0),
      set(state.frameTime, 0),
      set(state.time, 0),
      //   //   set(options.toValue, not(state.position)),
    ]),
    state.position,
  ]);
};

// const clock = new Clock();
const ReanimatedTest = () => {
  const [show, setShow] = useState(false);
  const opacityValue = new Value(0);

  const AnimClock = new Clock();

  // useCode(() => set(opacityValue, show ? 1 : 0), [show]);
  //   useCode(
  //     () => [
  //       cond(and(opacityValue, not(clockRunning(clock))), startClock(clock)),
  //       cond(and(not(opacityValue), clockRunning(clock)), stopClock(clock)),

  //       set(opacityValue, runTiming(clock)),
  //     ],
  //     [],
  //   );

  useCode(
    () => [
      cond(not(clockRunning(AnimClock)), startClock(AnimClock)),
      set(opacityValue, runTiming(AnimClock, show ? 1 : 0)),
    ],
    [],
  );

  return (
    <View>
      <Text>hello</Text>
      <Animated.View
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'red',
          alignSelf: 'center',
          marginVertical: 30,
          opacity: opacityValue,
        }}
      />
      <TouchableOpacity onPress={() => setShow(!show)}>
        <Text
          style={{
            backgroundColor: 'black',
            textAlign: 'center',
            fontSize: 20,
            padding: 10,
            color: 'white',
          }}>
          Toggle
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReanimatedTest;
