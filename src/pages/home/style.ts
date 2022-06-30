import styled from "styled-components/native";
import { ImageBackground, StyleSheet } from "react-native";
import { Theme } from "../../theme/theme";
import { MotiView } from "moti";

export const Header = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const Body = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
`;

export const Footer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const Img = styled.Image`
  width: 70px;
  height: 70px;
`;

export const ButtonDrink = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
`;

export const ModalBox = styled.View`
  width: 100%;
  height: 200px;
  background-color: ${Theme.colors.blueModal};
  position: absolute;
  bottom: 0;
`;

export const ImgModal = styled.Image`
  width: 50px;
  height: 50px;
`;

export const Igual = styled.Text`
  color: ${Theme.colors.white};
  font-size: ${Theme.font.size.titulo2};
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
  width: 80px;
  padding: 6px;
  font-size: ${Theme.font.size.body4};
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
  font-size: ${Theme.font.size.titulo2};
  color: ${Theme.colors.white};
`;
export const PorcentInfo = styled.Text`
  font-family: ${Theme.font.family.titulo1};
  font-size: ${Theme.font.size.titulo3};
  color: ${Theme.colors.white};
`;
