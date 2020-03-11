import * as React from "react";
import { StyleSheet, TextInput } from "react-native";
import { FormColors } from "../../styles/colors";
import { BORDER_WIDTH, BORDER_RADIUS } from "../../styles/styles";

export interface InputProps {}

export default class Input extends React.Component<InputProps, any> {
  constructor(props: InputProps) {
    super(props);
  }

  public render() {
    return <TextInput {...this.props} style={styles.input} />;
  }
}

export const styles = StyleSheet.create({
  input: {
    backgroundColor: FormColors.BACKGROUND,
    borderWidth: BORDER_WIDTH,
    borderRadius: BORDER_RADIUS,
    borderColor: FormColors.BORDER,
    shadowColor: FormColors.BORDER,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  inputLabel: {
    alignItems: "baseline",
    color: FormColors.INPUT_LABEL,
    fontSize: 14,
    textAlign: "center"
  }
});
