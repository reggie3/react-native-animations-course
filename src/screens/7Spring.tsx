import * as React from "react";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import Constants from "expo-constants";

import { onGestureEvent, clamp } from "react-native-redash";
import StyleGuide from "../components/common/StyleGuide";
import Card, {
  CARD_WIDTH,
  CARD_HEIGHT,
  cards
} from "../components/common/Card";

const {
  spring,
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
const snapX = (containerWidth - CARD_WIDTH) / 2;
const snapY = (containerHeight - CARD_HEIGHT) / 2;
const offsetX = new Value(snapX);
const offsetY = new Value(snapY);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background
  }
});

const [card] = cards;

const withSpring = (
  value: Animated.Value<number>,
  gestureState: Animated.Value<State>,
  offset: Animated.Value<number> = new Value(0),
  velocity: Animated.Value<number>,
  snapPoint: number
) => {
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    velocity,
    position: new Value(0),
    time: new Value(0)
  };
  const config = {
    damping: 10,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
    toValue: snapPoint
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
        spring(clock, state, config),
        cond(state.finished, onDecayFinished)
      ],
      [set(state.finished, 0), set(state.position, add(offset, value))]
    ),
    state.position
  ]);
};

const Spring = () => {
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

  const translateX = clamp(
    withSpring(translationX, state, offsetX, velocityX, snapX),
    0,
    containerWidth - CARD_WIDTH
  );
  const translateY = clamp(
    withSpring(translationY, state, offsetY, velocityY, snapY),

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

export default Spring;
