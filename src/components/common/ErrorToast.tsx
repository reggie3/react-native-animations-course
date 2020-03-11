import React from "react";
import { Toast } from "native-base";

export interface ErrorToastProps {
  error: string;
  onErrorCloseCallback?: () => void;
}

const defaultProps = {
  onErrorCloseCallback: () => {}
};
class ErrorToast extends React.Component<ErrorToastProps> {
  public static defaultProps = defaultProps;

  componentDidUpdate = (prevProps, prevState) => {
    // debugger;
    if (this.props.error && this.props.error && !prevProps.error) {
      Toast.show({
        text: this.props.error,
        buttonText: "Okay",
        onClose: () => {
          this.props.onErrorCloseCallback();
        },
        type: "danger",
        duration: 10000,
        style: { margin: 10 }
      });
    }
  };

  render() {
    return null;
  }
}

export default ErrorToast;
