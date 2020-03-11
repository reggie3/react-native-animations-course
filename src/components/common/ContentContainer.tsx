import * as React from "react";
import { View, ViewStyle } from "react-native";

interface ContentContainer {
  styles?: ViewStyle;
}

const ContentContainer = ({ children, styles = {} }) => {
  return <View style={{ flex: 1, ...styles }}>{children}</View>;
};

export default ContentContainer;
