import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import * as Device from "expo-device";
import { AdMobBanner, AdMobInterstitial, PublisherBanner, AdMobRewarded, setTestDeviceIDAsync } from "expo-ads-admob";
import { AppContainerBackGround } from "../../components/uiAppStyle/style";
import { Body, ButtonDrink, Footer, Header, Img } from "./style";
import copoImg from "../../img/copobotao.png";

// Set global test device ID

const Home: React.FC = () => {
  const testIDbanner = "ca-app-pub-3940256099942544/6300978111";
  const productionIDbanner = "ca-app-pub-7795545248519145/2047147404";
  // Is a real device and running in production.
  const adUnitID = Device.isDevice && !__DEV__ ? productionIDbanner : testIDbanner;

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
        <ButtonDrink>
          <Img resizeMode="cover" source={copoImg} />
        </ButtonDrink>
      </Footer>
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID={adUnitID} // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds // true or false
        onDidFailToReceiveAdWithError={(e) => console.log(e)}
      />
    </AppContainerBackGround>
  );
};

export default Home;
