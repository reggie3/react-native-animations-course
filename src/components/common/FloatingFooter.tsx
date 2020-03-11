import * as React from "react";
import { StyleSheet, View } from "react-native";

export const FloatingFooter = ({ style = {}, children }) => {
  if (!!children.length) {
  }

  return (
    <View style={{ ...style, ...styles.footer }}>
      <View>
        {!!children.length
          ? children.map((child: React.ReactElement, index: number) => {
              if (!!children[index + 1]) {
                return (
                  <View key={Math.random()} style={styles.buttonBottomMargin}>
                    {child}
                  </View>
                );
              }
              return child;
            })
          : children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    bottom: 0,
    left: 0,
    marginVertical: 10,
    paddingHorizontal: 5,
    right: 0,
    zIndex: 100
  },
  buttonBottomMargin: {
    marginBottom: 10
  }
});
