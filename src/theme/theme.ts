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
      body3_5: 15 + "px",
      body3: 12 + "px",
      body4: 18 + "px",
      titulo: 19 + "px",
      titulo2: 20 + "px",
      titulo3: 30 + "px",
    },
  },
  func: {
    wp: wp,
    hp: hp,
    heightTop: Constants.statusBarHeight,
  },
};
