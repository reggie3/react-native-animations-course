import * as React from "react";
import { StyleSheet, View } from "react-native";

interface PaddedContentContainerProps {}

const PaddedContentContainer: React.SFC<PaddedContentContainerProps> = ({
  children
}) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    padding: 10
  }
});

export default PaddedContentContainer;
