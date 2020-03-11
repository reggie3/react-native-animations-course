import * as React from "react";
import { StyleSheet, Text } from "react-native";

export interface InformationTextProps {}

export const InformationText = props => {
  return <Text style={styles.informationText}>{props.children}</Text>;
};

export const styles = StyleSheet.create({
  informationText: {
    color: "dodgerblue",
    fontSize: 16
  }
});
