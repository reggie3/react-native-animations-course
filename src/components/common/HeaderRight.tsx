import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useSelector, useDispatch } from "react-redux";
import { RootState, signOut } from "../../redux";
import { labels } from "../../labels/labels";
import { ACTION_SHEET_ICON_COLOR } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { Screens } from "../../screens/models";
import { Auth } from "aws-amplify";

interface HeaderRightProps {}

const HeaderRight: React.SFC<HeaderRightProps> = props => {
  const navigation = useNavigation();
  const { showActionSheetWithOptions } = useActionSheet();
  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
  const { actionSheet } = labels;
  const dispatch = useDispatch();

  const onMenuIconPressed = () => {
    const getIcon = (icon: React.ReactElement): React.ReactElement => {
      return (
        <View style={styles.iconContainer}>
          <Text>{icon}</Text>
        </View>
      );
    };
    const getIcons = (): React.ReactNode[] => {
      const icons: React.ReactNode[] = [
        getIcon(
          <Ionicons
            name="ios-information-circle-outline"
            size={36}
            color={ACTION_SHEET_ICON_COLOR}
          />
        )
      ];
      if (isSignedIn) {
        icons.push(
          getIcon(
            <AntDesign
              name="logout"
              size={30}
              color={ACTION_SHEET_ICON_COLOR}
            />
          )
        );
      } else {
        icons.push(
          getIcon(
            <AntDesign name="login" size={30} color={ACTION_SHEET_ICON_COLOR} />
          )
        );
      }

      icons.push(
        getIcon(
          <AntDesign
            name="circledowno"
            size={30}
            color={ACTION_SHEET_ICON_COLOR}
          />
        )
      );
      return icons;
    };
    const getOptions = (): string[] => {
      return isSignedIn
        ? [actionSheet.about, actionSheet.signOut, actionSheet.cancel]
        : [actionSheet.about, actionSheet.signIn, actionSheet.cancel];
    };

    showActionSheetWithOptions(
      {
        cancelButtonIndex: 2,
        destructiveButtonIndex: 2,
        icons: getIcons(),
        options: getOptions()
      },
      buttonIndex => {
        console.log(buttonIndex);
        switch (buttonIndex) {
          case 1: {
            if (isSignedIn) {
              Auth.signOut().then(() => {
                dispatch(signOut());
              });
            } else {
              navigation.navigate(Screens.AUTHENTICATION_SCREEN);
            }
          }
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onMenuIconPressed}>
        <Ionicons name="md-menu" size={36} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderRight;

const styles = StyleSheet.create({
  container: {
    marginRight: 10
  },
  iconContainer: { justifyContent: "flex-start", width: 40 }
});
