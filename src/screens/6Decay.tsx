import * as React from "react";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import Constants from "expo-constants";

import { onGestureEvent } from "react-native-redash";
import StyleGuide from "../components/common/StyleGuide";
import Card, {
  CARD_WIDTH,
  CARD_HEIGHT,
  cards
} from "../components/common/Card";

const {
  decay,
  stopClock,
  and,
  not,
  startClock,
  clockRunning,
  Clock,
  Value,
  event,
  diffClamp,
  cond,
  set,
  eq,
  add,
  block
} = Animated;

const { width, height } = Dimensions.get("window");
const containerWidth = width;
const containerHeight =
  height - Constants.statusBarHeight - (Platform.OS === "ios" ? 44 : 52);
const offsetX = new Value((containerWidth - CARD_WIDTH) / 2);
const offsetY = new Value((containerHeight - CARD_HEIGHT) / 2);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background
  }
});

const [card] = cards;

const withDecay = (
  value: Animated.Value<number>,
  gestureState: Animated.Value<State>,
  offset: Animated.Value<number> = new Value(0),
  velocity: Animated.Value<number>
) => {
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    velocity,
    position: new Value(0),
    time: new Value(0)
  };
  const config = {
    deceleration: 0.998
  };

  const isDecayInterrupted = eq(gestureState, State.BEGAN);
  const onDecayFinished = [set(offset, state.position), stopClock(clock)];
  const isDecayEnded = eq(gestureState, State.END);

  return block([
    cond(isDecayInterrupted, onDecayFinished),
    cond(
      isDecayEnded,
      [
        cond(and(not(clockRunning(clock)), not(state.finished)), [
          set(state.time, 0),
          startClock(clock)
        ]),
        decay(clock, state, config),
        cond(state.finished, onDecayFinished)
      ],
      [set(state.finished, 0), set(state.position, add(offset, value))]
    ),
    state.position
  ]);
};

const Decay = () => {
  const state = new Value(State.UNDETERMINED);
  const translationX = new Value(0);
  const translationY = new Value(0);
  const velocityX = new Value(0);
  const velocityY = new Value(0);

  const gestureHandler = onGestureEvent({
    state,
    translationX,
    translationY,
    velocityX,
    velocityY
  });

  const translateX = diffClamp(
    withDecay(translationX, state, offsetX, velocityX),
    0,
    containerWidth - CARD_WIDTH
  );
  const translateY = diffClamp(
    withDecay(translationY, state, offsetY, velocityY),
    0,
    containerHeight - CARD_HEIGHT
  );

  return (
    <View style={styles.container}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={{
            transform: [
              { translateX: (translateX as unknown) as number },
              { translateY: (translateY as unknown) as number }
            ]
          }}
        >
          <Card {...{ card }} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default Decay;
