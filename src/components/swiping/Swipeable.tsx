import * as React from "react";
import { StyleSheet } from "react-native";
import { onGestureEvent } from "react-native-redash";
import Animated from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";

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
  useCode,
  block,
  neq
} = Animated;

interface WithSpringProps {
  value: Animated.Adaptable<number>;
  velocity: Animated.Adaptable<number>;
  gestureState: Animated.Value<State>;
  snapPoint: number;
  offset?: Animated.Value<number>;
  config?: Animated.SpringConfig;
}
const withSpring = (props: WithSpringProps) => {
  const { value, velocity, gestureState, snapPoint, offset, config } = {
    offset: new Value(0),
    config: {
      damping: 6,
      mass: 1,
      stiffness: 100,
      overshootClamping: false,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001,
      toValue: new Value(0)
    },
    ...props
  };
  const clock = new Clock();

  const springState: Animated.SpringState = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0)
  };

  const isSpringInterrupted = and(
    eq(gestureState, State.BEGAN),
    clockRunning(clock)
  );
  const finishSpring = [set(offset, springState.position), stopClock(clock)];

  return block([
    cond(isSpringInterrupted, finishSpring),
    cond(neq(gestureState, State.END), [
      set(springState.finished, 0),
      set(springState.position, add(offset, value))
    ]),
    cond(eq(gestureState, State.END), [
      cond(and(not(clockRunning(clock)), not(springState.finished)), [
        set(springState.velocity, velocity),
        set(springState.time, 0),
        startClock(clock)
      ])
    ]),
    springState.position
  ]);
};

interface SwipeableProps {
  translateX: Animated.Value<number>;
  translateY: Animated.Value<number>;
}

export default ({ translateX, translateY }: SwipeableProps) => {
  const translationX = new Value(0);
  const translationY = new Value(0);
  const velocityX = new Value(0);
  const velocityY = new Value(0);
  const state = new Value(State.UNDETERMINED);

  const gestureHandler = onGestureEvent({
    velocityX,
    velocityY,
    translationX,
    translationY,
    state
  });

  const x = withSpring({
    value: translationX,
    velocity: velocityX,
    gestureState: state,
    snapPoint: 0
  });
  const y = withSpring({
    value: translationY,
    velocity: velocityY,
    gestureState: state,
    snapPoint: 0
  });

  useCode(() => block([set(translateX, x), set(translateY, y)]), []);

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View style={StyleSheet.absoluteFill} />
    </PanGestureHandler>
  );
};
