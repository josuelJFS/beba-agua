import React from "react";
import { Directions } from "react-native-gesture-handler";
import Svg, { Circle } from "react-native-svg";
import { Theme } from "../../theme/theme";

const ProcentagemConsumo: React.FC = () => {
  return (
    <Svg width={400} height={400}>
      <Circle cx="200" cy="240" r="145" stroke={Theme.colors.white} strokeWidth={22} />
      <Circle
        cx="200"
        cy="240"
        r="145"
        stroke={Theme.colors.GreyMedium2}
        strokeWidth={20}
        strokeDasharray={1000}
        strokeDashoffset={1000}
      />
    </Svg>
  );
};
export default ProcentagemConsumo;
