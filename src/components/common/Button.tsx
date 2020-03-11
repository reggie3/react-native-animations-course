import * as React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ButtonColors, ButtonBorderColors } from "../../styles/colors";
import { BORDER_WIDTH, BORDER_RADIUS } from "../../styles/styles";
import { convertStringToTestID } from "../../utilities";

export interface ButtonProps {
  disabled?: boolean;
  light?: boolean;
  info?: boolean;
  primary?: boolean;
  success?: boolean;
  warning?: boolean;
  danger?: boolean;
  dark?: boolean;
  onPress: () => void;
  rounded?: boolean;
  testID?: string;
}

export interface ButtonState {
  height: number;
  width: number;
  x: number;
  y: number;
}

const defaultProps = {
  primary: true
};
export default class Button extends React.Component<ButtonProps, ButtonState> {
  constructor(props: ButtonProps) {
    super(props);
    this.state = { height: null, width: null, x: null, y: null };
  }

  private getBackgroundColor = (): ButtonColors => {
    const { light, info, primary, success, warning, danger, dark } = this.props;
    if (light) {
      return ButtonColors.LIGHT;
    }
    if (info) {
      return ButtonColors.INFO;
    }
    if (primary) {
      return ButtonColors.PRIMARY;
    }
    if (success) {
      return ButtonColors.SUCCESS;
    }
    if (warning) {
      return ButtonColors.WARNING;
    }
    if (danger) {
      return ButtonColors.DANGER;
    }
    if (dark) {
      return ButtonColors.DARK;
    }
    return ButtonColors.PRIMARY;
  };
  private getBorderColor = (): ButtonColors => {
    const { light, info, primary, success, warning, danger, dark } = this.props;
    if (light) {
      return ButtonBorderColors.LIGHT;
    }
    if (info) {
      return ButtonBorderColors.INFO;
    }
    if (primary) {
      return ButtonBorderColors.PRIMARY;
    }
    if (success) {
      return ButtonBorderColors.SUCCESS;
    }
    if (warning) {
      return ButtonBorderColors.WARNING;
    }
    if (danger) {
      return ButtonBorderColors.DANGER;
    }
    if (dark) {
      return ButtonBorderColors.DARK;
    }
    return ButtonBorderColors.LIGHT;
  };

  private getRounded = (): ViewStyle => {
    if (this.props.rounded) {
      return { borderRadius: this.state.height / 2 };
    }
    return {};
  };

  private getDisabled = (): ViewStyle => {
    if (this.props.disabled) {
      return { backgroundColor: ButtonColors.DISABLED };
    }
    return {};
  };

  private onLayout = e => {
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
      x: e.nativeEvent.layout.x,
      y: e.nativeEvent.layout.y
    });
  };

  public render() {
    const { disabled, children, onPress, testID } = this.props;

    return (
      <TouchableOpacity
        onLayout={this.onLayout}
        onPress={disabled ? null : onPress}
        style={
          {
            ...styles.button,
            backgroundColor: this.getBackgroundColor(),
            borderColor: this.getBorderColor(),
            ...this.getRounded(),
            ...this.getDisabled()
          } as ViewStyle
        }
        testID={testID ?? ""}
      >
        {children}
      </TouchableOpacity>
    );
  }
}

const baseButton: ViewStyle = {
  alignItems: "center",
  borderWidth: BORDER_WIDTH,
  borderRadius: BORDER_RADIUS,
  justifyContent: "center",
  paddingVertical: 10,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5
};

export const styles = StyleSheet.create({
  button: {
    ...baseButton
  },
  buttonDisabled: {
    ...baseButton,
    backgroundColor: ButtonColors.LIGHT
  }
});
