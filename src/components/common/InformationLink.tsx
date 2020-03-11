import * as React from "react";
import { StyleSheet, Text } from "react-native";
import { styles as informationTextStyle } from "./InformationText";

export const InformationLink = props => {
  return <Text style={styles.informationLink}>{props.children}</Text>;
};

export const styles = StyleSheet.create({
  informationLink: {
    ...informationTextStyle.informationText,
    textDecorationLine: "underline"
  }
});
