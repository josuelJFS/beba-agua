import styled from "styled-components/native";
import { ImageBackground, StyleSheet } from "react-native";
import { Theme } from "../../theme/theme";
import { MotiView } from "moti";

export const Header = styled.View`
  flex: 1;
`;
export const Body = styled.View`
  flex: 2;
`;

export const Footer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const Img = styled.Image`
  width: ${Theme.func.wp(22)}px;
  height: ${Theme.func.wp(22)}px;
`;

export const ButtonDrink = styled.TouchableOpacity`
  width: ${Theme.func.wp(22)}px;
  height: ${Theme.func.wp(22)}px;
`;
