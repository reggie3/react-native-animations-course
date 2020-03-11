// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ValuesClocks } from "./src/screens/1ValuesClocks";
import { Home } from "./src/screens/Home";
import { Transitions } from "./src/screens/2Transitions";
import { ThreeCardTransition } from "./src/screens/3Transitions";
import { Timing } from "./src/screens/4Timing";
import PanGesture from "./src/screens/5PanGesture";
import Decay from "./src/screens/6Decay";
import Spring from "./src/screens/7Spring";
import Swiping from "./src/screens/8Swiping";
import ThreeDAnimationChallege from "./src/screens/ThreeDAnimationChallenge";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ValuesClocks" component={ValuesClocks} />
        <Stack.Screen name="Transitions" component={Transitions} />
        <Stack.Screen
          name="ThreeCardTransition"
          component={ThreeCardTransition}
        />
        <Stack.Screen name="Timing" component={Timing} />
        <Stack.Screen name="PanGesture" component={PanGesture} />
        <Stack.Screen name="Decay" component={Decay} />
        <Stack.Screen name="Spring" component={Spring} />
        <Stack.Screen name="Swiping" component={Swiping} />
        <Stack.Screen
          name="ThreeDAnimationChallege"
          component={ThreeDAnimationChallege}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
