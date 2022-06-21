import styled from "styled-components/native";
import { Theme } from "../../theme/theme";

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  margin-left: 20px;
  margin-right: 20px;
  justify-content: center;
  align-items: center;
`;
export const Img = styled.Image`
  width: ${Theme.func.wp(42)}px;
  height: ${Theme.func.wp(42)}px;
  margin-right: 20px;
`;
