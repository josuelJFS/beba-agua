import React, { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity, Text } from "react-native";
import * as Device from "expo-device";
import { AdMobBanner, AdMobInterstitial, PublisherBanner, AdMobRewarded, setTestDeviceIDAsync } from "expo-ads-admob";
import { AppContainerBackGround } from "../../components/uiAppStyle/style";
import { Body, ButtonDrink, Footer, Header, Img } from "./style";
import copoImg from "../../img/copobotao.png";
import ModalDrink from "./modalDrink";
import { useAutenticacaoContext } from "../../contexts/autenticacao";

const Home: React.FC = () => {
  const { userInfo, setUserInfo } = useAutenticacaoContext();
  const [showModal, setShowModal] = useState(false);
  const [porcent, setPorcent] = useState<number>(0);
  const testIDbanner = "ca-app-pub-3940256099942544/6300978111";
  const productionIDbanner = "ca-app-pub-7795545248519145/2047147404";
  // Is a real device and running in production.
  const adUnitID = Device.isDevice && !__DEV__ ? productionIDbanner : testIDbanner;

  async function setUserInfosLoad() {
    await AsyncStorage.setItem("user", JSON.stringify(userInfo));
    userInfo.quantoTomeiDia > 0 && setPorcent((userInfo.quantoTomeiDia / userInfo.aguaDiariaIdeal) * 100);
    //await AsyncStorage.removeItem("user");
  }

  useEffect(() => {
    setUserInfosLoad();
  }, [userInfo]);

  useEffect(() => {
    userInfo?.peso > 0 && setUserInfo((props) => ({ ...props, aguaDiariaIdeal: props!.peso * 35 }));
  }, []);

  console.log(userInfo, porcent);

  async function loadAnuncio() {
    try {
      await AdMobInterstitial.setAdUnitID("ca-app-pub-7795545248519145/9663474042"); // Test ID, Replace with your-admob-unit-id
      await AdMobInterstitial.requestAdAsync();
      await AdMobInterstitial.showAdAsync();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AppContainerBackGround colors={["#35DBFF", "#0C9BFF"]} start={{ x: -0.3, y: 0.4 }}>
      <Header></Header>
      <Body></Body>
      <Footer>
        <ButtonDrink onPress={() => setShowModal(true)}>
          <Img resizeMode="cover" source={copoImg} />
        </ButtonDrink>
      </Footer>
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID={adUnitID} // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds // true or false
        onDidFailToReceiveAdWithError={(e) => console.log(e)}
      />
      <ModalDrink isChose={setShowModal} showModal={showModal} />
    </AppContainerBackGround>
  );
};

export default Home;
