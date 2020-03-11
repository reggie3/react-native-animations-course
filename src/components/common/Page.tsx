import * as React from "react";
import { globalStyles } from "../../styles/styles";
import { Container } from "native-base";

export interface PageProps {}

export function Page({ children }) {
  return <Container style={globalStyles.container}>{children}</Container>;
}
