import * as React from "react";
import { View, Text } from "react-native";
import { SwipableExample, profiles } from "../components/swiping";

export interface SwipingProps {}

export function Swiping(props: SwipingProps) {
  return <SwipableExample />;
}

export default Swiping;
