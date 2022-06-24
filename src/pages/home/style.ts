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

export const ModalBox = styled.View`
  width: ${Theme.func.wp(100)}px;
  height: 200px;
  background-color: ${Theme.colors.blueModal};
  position: absolute;
  bottom: 0;
`;

export const ImgModal = styled.Image`
  width: ${Theme.func.wp(15)}px;
  height: ${Theme.func.wp(15)}px;
`;

export const Igual = styled.Text`
  color: ${Theme.colors.white};
  font-size: ${Theme.func.wp(10)}px;
  font-family: ${Theme.font.family.titulo1};
  margin-right: 6px;
  margin-left: 6px;
`;

export const ContainerTop = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const InputML = styled.TextInput`
  width: ${Theme.func.wp(25)}px;
  padding: 6px;
  font-size: ${Theme.func.wp(5)}px;
  color: ${Theme.colors.blueFont1};
  font-family: ${Theme.font.family.titulo1};
  height: 47px;
  background-color: ${Theme.colors.white};
  border-radius: 10px;
`;

export const ButtonDrinkNow = styled.TouchableOpacity`
  width: 80%;
  height: 60px;
  background-color: ${Theme.colors.blueButtom};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const ContainerFooter = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ButtonName = styled.Text`
  font-family: ${Theme.font.family.titulo1};
  font-size: ${Theme.func.wp(7)}px;
  color: ${Theme.colors.white};
`;
