import React from "react";
import { Dimensions, StyleSheet, Text, ViewStyle } from "react-native";
import { bInterpolate } from "react-native-redash";
import Animated from "react-native-reanimated";

import { TouchableOpacity } from "react-native-gesture-handler";
import { alpha, perspective } from "./Constants";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: "#F6F5F9"
  },
  button: {
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 20,
    padding: 16
  },
  label: {
    fontSize: 16,
    fontWeight: "500"
  }
});

interface ScreenProps {
  open: Animated.Value<0 | 1>;
  transition: Animated.Node<number>;
}

export default ({ open, transition }: ScreenProps) => {
  const rotateY = bInterpolate(transition, 0, -alpha);
  const scale = bInterpolate(transition, 1, 0.9);
  const opacity = bInterpolate(transition, 0, 0.5);
  const borderRadius = bInterpolate(transition, 0, 20);
  return (
    <>
      <Animated.View
        style={
          ([
            styles.container,
            {
              borderRadius,
              transform: [
                perspective,
                { translateX: width / 2 },
                { rotateY },
                { translateX: -width / 2 },
                { scale }
              ]
            }
          ] as unknown) as ViewStyle
        }
      >
        <TouchableOpacity onPress={() => open.setValue(1)}>
          <Animated.View style={styles.button}>
            <Text style={styles.label}>Show Menu</Text>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        pointerEvents="none"
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: "black",
          opacity
        }}
      />
    </>
  );
};
