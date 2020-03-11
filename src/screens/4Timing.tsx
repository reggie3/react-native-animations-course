import * as React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import Button from "../components/common/Button";
import { ButtonText } from "../components/common/ButtonText";
import { useState } from "react";
import Animated, { Easing } from "react-native-reanimated";
import { useMemoOne } from "use-memo-one";
const {
  Clock,
  Value,
  useCode,
  set,
  block,
  cond,
  startClock,
  stopClock,
  clockRunning,
  and,
  not,
  eq,
  timing,
  interpolate,
  Extrapolate
} = Animated;

const BUBBLE_SIZE = Dimensions.get("window").width - 100;
const BUBBLE_BALL_SIZE = BUBBLE_SIZE / 7;

export interface TimingProps {}

const runTiming = (clock: Animated.Clock) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    frameTime: new Value(0),
    time: new Value(0)
  };
  const config = {
    toValue: new Value(1),
    duration: 1000,
    easing: Easing.linear
  };
  return block([
    timing(clock, state, config),
    cond(eq(state.finished, 1), [
      set(state.finished, 0),
      set(state.frameTime, 0),
      set(state.time, 0),
      set(config.toValue, cond(eq(state.position, 1), 0, 1))
    ]),
    state.position
  ]);
};

export function Timing(props: TimingProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const bubbles = [0, 1, 2];
  const delta = 1 / bubbles.length;

  const { playing, progress, clock } = useMemoOne(
    () => ({
      progress: new Value(0),
      clock: new Clock(),
      playing: new Value(0) as Animated.Value<number>
    }),
    []
  );

  playing.setValue(isPlaying ? 1 : 0);
  useCode(
    () =>
      block([
        cond(and(eq(playing, 0), clockRunning(clock)), stopClock(clock)),
        cond(and(eq(playing, 1), not(clockRunning(clock))), startClock(clock)),
        set(progress, runTiming(clock))
      ]),
    []
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.bubbleContainer}>
        <View style={styles.bubble}>
          {bubbles.map((bubble, index) => {
            const start = index * delta;
            const end = start + delta;
            const scale = interpolate(progress, {
              inputRange: [start, end],
              outputRange: [1, 1.5],
              extrapolate: Extrapolate.CLAMP
            });
            const opacity = interpolate(progress, {
              inputRange: [start, end],
              outputRange: [0.5, 1],
              extrapolate: Extrapolate.CLAMP
            });
            return (
              <Animated.View
                key={index}
                style={{
                  ...styles.bubbleBall,
                  opacity: (opacity as unknown) as number,
                  transform: [{ scale: (scale as unknown) as number }]
                }}
              />
            );
          })}
        </View>
      </View>
      <Button
        onPress={() => {
          setIsPlaying(!isPlaying);
        }}
      >
        <ButtonText>{isPlaying ? "Pause" : "Play"}</ButtonText>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  bubbleBall: {
    borderRadius: BUBBLE_BALL_SIZE / 2,
    backgroundColor: "dodgerblue",
    width: BUBBLE_BALL_SIZE,
    height: BUBBLE_BALL_SIZE
  },
  bubble: {
    borderTopLeftRadius: BUBBLE_SIZE / 2,
    borderTopRightRadius: BUBBLE_SIZE / 2,
    borderBottomLeftRadius: BUBBLE_SIZE / 2,
    width: BUBBLE_SIZE,
    height: BUBBLE_SIZE,
    backgroundColor: "lightgray",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  bubbleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
