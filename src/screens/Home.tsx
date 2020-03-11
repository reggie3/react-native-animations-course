import * as React from "react";
import { View, Text } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Button from "../components/common/Button";
import { ButtonText } from "../components/common/ButtonText";
import { Screens } from "../screens";
export interface HomeProps {
  navigation: any;
}

interface Page {
  label: string;
  screen: Screens;
}
const pages: Page[] = [
  { label: "Values and Clocks", screen: Screens.VALUES_AND_CLOCKS },
  { label: "Transitions", screen: Screens.TRANSITIONS },
  { label: "Three Card Transition", screen: Screens.THREE_CARD_TRANSITION },
  { label: "Timing", screen: Screens.TIMING },
  { label: "Pan Gesture", screen: Screens.PAN_GESTURE },
  { label: "Decay", screen: Screens.DECAY },
  { label: "Spring", screen: Screens.SPRING },
  { label: "Swiping", screen: Screens.SWIPING },
  {
    label: "3 D Animation Challenge",
    screen: Screens.THREE_D_ANIMATION_CHALLENGE
  }
];
export function Home({ navigation }: HomeProps) {
  return (
    <View style={{ padding: 10 }}>
      <ScrollView>
        {pages.map(page => {
          return (
            <View key={page.screen} style={{ marginBottom: 10 }}>
              <Button success onPress={() => navigation.navigate(page.screen)}>
                <ButtonText>{page.label}</ButtonText>
              </Button>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
