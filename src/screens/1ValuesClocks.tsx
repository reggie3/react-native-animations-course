import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { PrettyCard } from "../components/common/Card";
import Button from "../components/common/Button";
import { ButtonText } from "../components/common/ButtonText";
import { useState } from "react";
import Animated from "react-native-reanimated";
import { useMemoOne } from "use-memo-one";

export interface ValuesClocksProps {}

const {
  Clock,
  block,
  Value,
  useCode,
  set,
  not,
  cond,
  startClock,
  clockRunning,
  stopClock,
  Extrapolate,
  interpolate,
  add,
  eq
} = Animated;
const DURATION = 2000;

export function ValuesClocks(props: ValuesClocksProps) {
  const [show, setShow] = useState(true);
  const { time, clock, progress } = useMemoOne(
    () => ({
      time: new Value(0),
      clock: new Clock(),
      progress: new Value(0)
    }),
    []
  );

  const opacity = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: show ? [0, 1] : [1, 0],
    extrapolate: Extrapolate.CLAMP
  });

  useCode(
    () =>
      block([
        cond(not(clockRunning(clock)), [startClock(clock), set(time, clock)]),
        set(
          progress,
          interpolate(clock, {
            inputRange: [time, add(time, DURATION)],
            outputRange: [0, 1],
            extrapolate: Extrapolate.CLAMP
          })
        ),
        cond(eq(progress, 1), stopClock(clock))
      ]),
    []
  );

  const toggleButton = () => {
    setShow(prev => !prev);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Animated.View style={{ opacity }}>
          <PrettyCard />
        </Animated.View>
      </View>
      <Button onPress={toggleButton}>
        <ButtonText>{show ? "Hide" : "Show"}</ButtonText>
      </Button>
    </View>
  );
}
