import * as React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import Card, { cards } from "../components/common/Card";
import Button from "../components/common/Button";
import { ButtonText } from "../components/common/ButtonText";
import Animated, { Easing } from "react-native-reanimated";
import { useState } from "react";
import StyleGuide from "../components/common/StyleGuide";
import { useTimingTransition, bInterpolate } from "react-native-redash";
const { multiply, interpolate } = Animated;

export interface ThreeCardTransitionProps {}

export const ThreeCardTransition = (props: ThreeCardTransitionProps) => {
  const [toggled, setToggled] = useState<boolean>(false);
  const transitionVal = useTimingTransition(toggled, {
    duration: 400,
    easing: Easing.inOut(Easing.ease)
  });
  const switchCards = () => {
    // @ts-ignore Argument of type 'number' is not assignable to parameter of type 'SetStateAction<0 | 1>'
    setToggled(!toggled);
  };

  const transformOrigin =
    (-1 * Dimensions.get("window").width) / 2 - StyleGuide.spacing * 2;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {cards.map((card, index) => {
          const rotation = interpolate(index, {
            inputRange: [0, 1, 2],
            outputRange: [-1, 0, 1]
          });

          const rotate = multiply(
            rotation,
            bInterpolate(transitionVal, 0, Math.PI / 6)
          );

          return (
            <Animated.View
              key={card.id}
              style={[
                styles.cardContainer,
                {
                  transform: [
                    { translateX: transformOrigin },
                    { rotate: (rotate as unknown) as string },
                    { translateX: -transformOrigin }
                  ]
                }
              ]}
            >
              <Card key={card.id} {...{ card }} />
            </Animated.View>
          );
        })}
      </View>
      <Button onPress={switchCards}>
        <ButtonText>{toggled ? "Reset" : "Rotate"}</ButtonText>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center"
  }
});
