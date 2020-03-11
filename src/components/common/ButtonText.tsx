import * as React from "react";
import { StyleSheet, Text } from "react-native";

interface ButtonTextProps {
  children: React.ReactNode;
  dark?: boolean;
}

export const ButtonText = ({ children, dark }: ButtonTextProps) => {
  return (
    <Text style={{ ...styles.text, color: dark ? "darkgray" : "white" }}>
      {children}
    </Text>
  );
};

export const styles = StyleSheet.create({
  text: {
    alignSelf: "center",
    fontSize: 18
  }
});
