import React from "react";
import {
  PanGestureHandler,
  State,
  TouchableOpacity
} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

const {
  Clock,
  Value,
  and,
  block,
  clockRunning,
  cond,
  diff,
  divide,
  eq,
  interpolate,
  neq,
  not,
  set,
  stopClock,
  useCode
} = Animated;
import {
  bInterpolate,
  clamp,
  onGestureEvent,
  snapPoint,
  spring,
  timing
} from "react-native-redash";

import { alpha, perspective } from "./Constants";
import Content, { width } from "./Content";
import { ViewStyle, View } from "react-native";

const MIN = -width * Math.tan(alpha);
const MAX = 0;
const PADDING = 100;

interface ProfileProps {
  open: Animated.Value<0 | 1>;
  transition: Animated.Node<number>;
}

export default ({ open, transition: openingTransition }: ProfileProps) => {
  const transition = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const translationX = new Value(0);
  const velocityX = new Value(0);
  const translateX = bInterpolate(transition, MIN, MAX);
  const gestureHandler = onGestureEvent({ state, translationX, velocityX });
  const x = clamp(translationX, MIN, MAX + PADDING);
  const gestureTransition = interpolate(x, {
    inputRange: [MIN, MAX],
    outputRange: [0, 1]
  });
  const opacity = bInterpolate(transition, 0, 1);
  const rotateY = bInterpolate(transition, alpha, 0);
  const snapTo = eq(snapPoint(x, velocityX, [MIN, MAX]), MAX);
  const clock = new Clock();
  const isDone = new Value(0);
  const isOpening = and(neq(diff(openingTransition), 0), open);

  useCode(
    () =>
      block([
        cond(isOpening, set(transition, openingTransition)),
        cond(eq(state, State.BEGAN), [stopClock(clock)]),
        cond(eq(state, State.ACTIVE), [
          set(isDone, 0),
          set(transition, gestureTransition)
        ]),
        cond(and(eq(state, State.END), not(isDone)), [
          set(
            transition,
            cond(
              eq(snapTo, 1),
              spring({ clock, from: transition, to: 1 }),
              timing({ clock, from: transition, to: 0 })
            )
          ),
          cond(not(clockRunning(clock)), [set(isDone, 1), set(open, snapTo)])
        ])
      ]),
    [
      clock,
      gestureTransition,
      isDone,
      open,
      openingTransition,
      snapTo,
      transition
    ]
  );

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={{
          opacity,
          transform: [
            perspective,
            { translateX },
            { translateX: -width / 2 },
            { rotateY },
            { translateX: width / 2 }
          ]
        }}
      >
        <Content />
      </Animated.View>
    </PanGestureHandler>
  );
};
