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
import { registerForPushNotificationsAsync, schedulePushNotification } from "../../service/pushNotification";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

const BACKGROUND_FETCH_TASK = "background-fetch";

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
    registerForPushNotificationsAsync();

    TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
      const now = new Date();
      if (userInfo.horaDormi > now.getHours() && userInfo.horaAcorda < now.getHours()) await schedulePushNotification();
      // Be sure to return the successful result type!
      return BackgroundFetch.BackgroundFetchResult.NewData;
    });

    registerBackgroundFetchAsync();
  }, []);

  async function registerBackgroundFetchAsync() {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 60 * 30, // 15 minutes
      stopOnTerminate: false, // android only,
      startOnBoot: true, // android only
    });
  }

  async function unregisterBackgroundFetchAsync() {
    return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
  }

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
      <Body>
        <ProcentagemConsumo></ProcentagemConsumo>
      </Body>
      <Footer>
        <ButtonDrink onPress={() => setShowModal(true)}>
          <Img resizeMode="cover" source={copoImg} />
        </ButtonDrink>
      </Footer>
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds // true or false
        onDidFailToReceiveAdWithError={(e) => console.log(e)}
      />
      <ModalDrink isChose={setShowModal} showModal={showModal} />
    </AppContainerBackGround>
  );
};

export default Home;
