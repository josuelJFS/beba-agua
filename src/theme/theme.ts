import Constants from "expo-constants";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const Theme = {
  colors: {
    white: "#ffffff",
    GreyMedium2: "#575757",
    blueModal: "#00C2FF",
    blueFont1: "#0096B7",
    blueButtom: "#35DBFF",
    blueCop: "#5CE9FF",
    blueCopCheio: "#007FB6",
  },
  font: {
    family: {
      titulo1: "Inter_800ExtraBold",
      subtitulo: "Inter_600SemiBold",
    },
    size: {
      body3_5: wp(3.5) + "px",
      body3: wp(3.1) + "px",
      body4: wp(4) + "px",
      titulo: wp(5) + "px",
      titulo2: wp(5.5) + "px",
    },
  },
  func: {
    wp: wp,
    hp: hp,
    heightTop: Constants.statusBarHeight,
  },
};
