import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

export interface HorizontalButtonRowProps {
  children: React.ReactNode[];
}

export function HorizontalButtonRow({ children }: HorizontalButtonRowProps) {
  return (
    <View style={styles.buttonRow}>
      {children.map((child, index) => {
        const buttonContainerStyle =
          index === children.length - 1
            ? styles.buttonContainerWithNoMargin
            : styles.buttonContainerWithMargin;
        return (
          <View key={index} style={buttonContainerStyle}>
            {child}
          </View>
        );
      })}
    </View>
  );
}

const baseButtonContaineStyle = {
  flex: 1
};
const styles = StyleSheet.create({
  buttonContainerWithMargin: {
    marginRight: 10,
    ...baseButtonContaineStyle
  },
  buttonContainerWithNoMargin: { ...baseButtonContaineStyle },
  buttonRow: {
    flexDirection: "row"
  }
});
