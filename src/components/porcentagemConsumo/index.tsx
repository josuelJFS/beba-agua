/* eslint-disable prefer-const */
import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import { Theme } from "../../theme/theme";

const styles = StyleSheet.create({
  textView: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 40,
  },
});

type props = {
  percentage: number;
  blankColor?: string;
  donutColor?: string;
  fillColor?: string;
  progressWidth?: number;
  size?: number;
};

function generateArc(percentage, radius) {
  if (percentage === 100) percentage = 99.999;
  if (percentage >= 100) percentage = 99.999;
  const a = (percentage * 2 * Math.PI) / 100; // angle (in radian) depends on percentage
  const r = radius; // radius of the circle

  let rx = r,
    ry = r,
    xAxisRotation = 0,
    largeArcFlag = 1,
    sweepFlag = 1,
    x = r + r * Math.sin(a),
    y = r - r * Math.cos(a);
  if (percentage <= 50) {
    largeArcFlag = 0;
  } else {
    largeArcFlag = 1;
  }

  return `A${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${x} ${y}`;
}

const CircularProgress: React.FC<props> = ({
  percentage = 40,
  blankColor = Theme.colors.white,
  donutColor = Theme.colors.blueFont1,
  fillColor = "white",
  progressWidth = 100,
  size = 250,
  children,
}) => {
  const half = size / 2;
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Circle cx={half} cy={half} r={half} fill={blankColor} />
        <Path d={`M${half} ${half} L${half} 0 ${generateArc(percentage, half)} Z`} fill={donutColor} />
        {<Circle cx={half} cy={half} r={progressWidth} fill={Theme.colors.blueModal} />}
      </Svg>
      <View style={styles.textView}>{children}</View>
    </View>
  );
};
export default CircularProgress;
