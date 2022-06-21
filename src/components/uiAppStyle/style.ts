import styled from "styled-components/native";
import { ImageBackground, StyleSheet } from "react-native";
import { Theme } from "../../theme/theme";
import { LinearGradient } from "expo-linear-gradient";

export const AppContainerBackGround = styled(LinearGradient)`
  flex: 1;
`;

export const AppTitulo = styled.Text`
  font-family: ${Theme.font.family.titulo1};
  font-size: ${Theme.font.size.titulo2};
  color: ${Theme.colors.white};
  margin: 12px;
`;

export const AppSubTitulo = styled.Text`
  font-family: ${Theme.font.family.subtitulo};
  font-size: ${Theme.font.size.body3};
  color: ${Theme.colors.white};
  text-align: center;
  width: 90%;
`;

export const AppButton = styled.TouchableOpacity`
  width: 80%;
  height: 60px;
  background-color: #65beff;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

export const AppTextButton = styled.Text`
  font-family: ${Theme.font.family.titulo1};
  font-size: ${Theme.font.size.titulo2};
  color: ${Theme.colors.white};
`;
