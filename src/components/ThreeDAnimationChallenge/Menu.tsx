import React from "react";
import { StyleSheet, View } from "react-native";

import { withSpringTransition } from "react-native-redash";
import Animated from "react-native-reanimated";
import Screen from "./ThreeDAnimationChallenge";
import Profile from "./Profile";

const { Value } = Animated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  layer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center"
  }
});

export default () => {
  const open = new Value(0);
  const transition = withSpringTransition(open);
  return (
    <View style={styles.container}>
      <Screen {...{ open, transition }} />
      <View style={styles.layer} pointerEvents="box-none">
        <Profile {...{ open, transition }} />
      </View>
    </View>
  );
};
