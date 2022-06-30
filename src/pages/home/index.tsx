import React, { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity, Text, View } from "react-native";
import * as Device from "expo-device";
import { AdMobBanner, AdMobInterstitial, PublisherBanner, AdMobRewarded, setTestDeviceIDAsync } from "expo-ads-admob";
import { AppContainerBackGround, AppSubTitulo, AppTitulo } from "../../components/uiAppStyle/style";
import { Body, ButtonDrink, Footer, Header, Img, PorcentInfo } from "./style";
import copoImg from "../../img/copobotao.png";
import ModalDrink from "./modalDrink";
import { useAutenticacaoContext } from "../../contexts/autenticacao";
import { registerForPushNotificationsAsync, schedulePushNotification } from "../../service/pushNotification";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import ProcentagemConsumo from "../../components/porcentagemConsumo";
import CircularProgress from "../../components/porcentagemConsumo";
import CopsHeader from "../../components/copsHeader";
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import AnimateNumber from "react-native-animate-number";
import { AnimatedCircularProgress, AnimatedCircularProgressProps } from "react-native-circular-progress";

// eslint-disable-next-line prefer-const
let hora_acorda = 0;
// eslint-disable-next-line prefer-const
let hora_dorme = 0;

const BACKGROUND_FETCH_TASK = "copoAlertas";
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = new Date();
  if (now.getHours() > hora_acorda && now.getHours() < hora_dorme) schedulePushNotification();

  // Be sure to return the successful result type!
  return true;
});

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
    hora_dorme = userInfo.horaDormi;
    hora_acorda = userInfo.horaAcorda;
  }, [userInfo]);

  useEffect(() => {
    userInfo?.peso > 0 && setUserInfo((props) => ({ ...props, aguaDiariaIdeal: props!.peso * 35 }));
    if (userInfo?.day < new Date().getDate()) {
      setUserInfo((props) => ({ ...props, day: new Date().getDate(), quantoTomeiDia: 0 }));
      setPorcent(0);
    }

    if (!userInfo?.day) {
      setUserInfo((props) => ({ ...props, day: new Date().getDate() }));
    }

    registerForPushNotificationsAsync();
    registerBackgroundFetchAsync();

    //unregisterBackgroundFetchAsync
  }, []);

  async function registerBackgroundFetchAsync() {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 60 * 40,
      stopOnTerminate: false, // android only,
      startOnBoot: true, // android only
    });
  }

  async function unregisterBackgroundFetchAsync() {
    return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
  }

  return (
    <AppContainerBackGround colors={["#35DBFF", "#0C9BFF"]} start={{ x: -0.3, y: 0.4 }}>
      <Header>
        <AppTitulo>Meta de Consumo Diário </AppTitulo>
        <AppSubTitulo
          onPress={() => {
            setUserInfo((props) => ({ ...props, day: new Date().getDate(), quantoTomeiDia: 0 }));
            setPorcent(0);
          }}
        >
          <AnimateNumber countBy={3} interval={1} value={userInfo.quantoTomeiDia} timing="easeIn" /> /{" "}
          {userInfo.aguaDiariaIdeal} ml
        </AppSubTitulo>
        <CopsHeader porcent={Math.floor(porcent)} />
      </Header>
      <Body>
        <AnimatedCircularProgress
          duration={2000}
          size={200}
          width={25}
          fill={porcent}
          tintColor="#00e0ff"
          backgroundColor="#3d5875"
        >
          {(fill) => <PorcentInfo>{parseInt(fill)}%</PorcentInfo>}
        </AnimatedCircularProgress>
      </Body>
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
