import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import ThreeDHome from "./ThreeDHomeScreen";
import Profile from "./Profile";
import Animated from "react-native-reanimated";
import { withTransition, withSpringTransition } from "react-native-redash";

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
  const open = new Value<0 | 1>(0);
  const transition = withSpringTransition(open);

  return (
    <View style={styles.container}>
      <ThreeDHome
        onPress={() => {
          open.setValue(1);
        }}
        transition={transition}
      />
      <View style={styles.layer} pointerEvents="box-none">
        <Profile open={open} transition={transition} />
      </View>
    </View>
  );
};
