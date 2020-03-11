import * as React from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ViewStyle,
  ImageStyle
} from "react-native";
import { FlexibleCard as Card, cards } from "../components/common/Card";
import StyleGuide from "../components/common/StyleGuide";
import { useState, useRef } from "react";
import Button from "../components/common/Button";
import { ButtonText } from "../components/common/ButtonText";
import {
  Transitioning,
  Transition,
  TransitioningView
} from "react-native-reanimated";

export interface TransitionsProps {}

interface Layout {
  id: string;
  name: string;
  layout: {
    container: ViewStyle;
    child?: ImageStyle;
  };
}

const { width } = Dimensions.get("window");

const column: Layout = {
  id: "column",
  name: "Column",
  layout: {
    container: {
      flexDirection: "column"
    }
  }
};

const row: Layout = {
  id: "row",
  name: "Row",
  layout: {
    container: {
      alignItems: "center",
      flexDirection: "row"
    }
  }
};

const wrap: Layout = {
  id: "wrap",
  name: "Wrap",
  layout: {
    container: {
      alignItems: "center",
      flexDirection: "row",
      flexWrap: "wrap"
    },
    child: {
      flex: 0,
      width: width / 2 - StyleGuide.spacing * 2
    }
  }
};

const layouts = [column, row, wrap];
const transition = (
  <Transition.Change durationMs={400} interpolation="easeInOut" />
);

export const Transitions = (props: TransitionsProps) => {
  const [currentLayout, setCurrentLayout] = useState(layouts[0]);
  const ref = useRef<TransitioningView>(null);

  return (
    <View style={{ flex: 1 }}>
      <Transitioning.View
        {...{ ref, transition }}
        style={[styles.container, currentLayout.layout.container]}
      >
        {cards.map(card => (
          <Card
            key={card.id}
            style={currentLayout.layout.child}
            {...{ card }}
          />
        ))}
      </Transitioning.View>
      {layouts.map(layout => (
        <View key={layout.name} style={{ marginBottom: 5 }}>
          <Button
            success={currentLayout === layout}
            primary={currentLayout !== layout}
            onPress={() => {
              if (ref.current) {
                ref.current.animateNextTransition();
              }
              setCurrentLayout(layout);
            }}
          >
            <ButtonText>{layout.name}</ButtonText>
          </Button>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
