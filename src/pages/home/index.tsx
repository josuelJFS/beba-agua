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
import { AnimatedCircularProgress, AnimatedCircularProgressProps } from "react-native-circular-progress";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import {
  AndroidNotificationPriority,
  AndroidNotificationVisibility,
  cancelAllScheduledNotificationsAsync,
  getAllScheduledNotificationsAsync,
} from "expo-notifications";
import AntDesign from "react-native-vector-icons/AntDesign";

// eslint-disable-next-line prefer-const
let hora_acorda = 0;
// eslint-disable-next-line prefer-const
let hora_dorme = 0;
// eslint-disable-next-line prefer-const
let dataOntem = "";

const BACKGROUND_FETCH_TASK = "copoAlertas";
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = new Date();
  // if (now.getHours() > hora_acorda && now.getHours() < hora_dorme) schedulePushNotification();

  return true;
});

const Home: React.FC = () => {
  const { userInfo, setUserInfo } = useAutenticacaoContext();
  const [showModal, setShowModal] = useState(false);
  const [porcent, setPorcent] = useState<number>(0);
  const notificationListener = useRef(null);
  const responseListener = useRef(null);
  const navigation = useNavigation();

  const testIDbanner = "ca-app-pub-3940256099942544/6300978111";
  const productionIDbanner = "ca-app-pub-7795545248519145/7128125251";
  // Is a real device and running in production.
  const adUnitID = Device.isDevice && !__DEV__ ? productionIDbanner : testIDbanner;

  async function setUserInfosLoad() {
    await AsyncStorage.setItem("user", JSON.stringify(userInfo));
    userInfo.quantoTomeiDia > 0 && setPorcent((userInfo.quantoTomeiDia / userInfo.aguaDiariaIdeal) * 100);
    //await AsyncStorage.removeItem("user");
    const now = new Date();
    const yesterday = new Date(userInfo?.data);

    if (
      new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate()) <
      new Date(now.getFullYear(), now.getMonth(), now.getDate())
    ) {
      setUserInfo((props) => ({
        ...props,
        data: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
        quantoTomeiDia: 0,
      }));
      setPorcent(0);
    }
    if (!userInfo?.data) {
      setUserInfo((props) => ({ ...props, data: new Date(now.getFullYear(), now.getMonth(), now.getDate()) }));
    }
    return;
  }

  useEffect(() => {
    registerForPushNotificationsAsync();
    //registerBackgroundFetchAsync();
    schedulePushNotification(userInfo?.horaAcorda, userInfo?.horaDormi);

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {});

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    setUserInfosLoad();
    hora_dorme = userInfo.horaDormi;
    hora_acorda = userInfo.horaAcorda;
  }, [userInfo]);

  useEffect(() => {
    userInfo?.peso > 0 && setUserInfo((props) => ({ ...props, aguaDiariaIdeal: props!.peso * 35 }));

    //unregisterBackgroundFetchAsync();
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

  function dateRevert(e: string) {
    if (!e) return undefined;
    const strData = e;
    const partesData = strData.split("/");
    const data = new Date(parseInt(partesData[2]), parseInt(partesData[1]) - 1, parseInt(partesData[0]));
    return data;
  }

  return (
    <AppContainerBackGround colors={["#35DBFF", "#0C9BFF"]} start={{ x: -0.3, y: 0.4 }}>
      <Header>
        <AppTitulo>Meta de Consumo Diário </AppTitulo>
        <AppSubTitulo>
          {userInfo.quantoTomeiDia} / {userInfo.aguaDiariaIdeal} ml
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
        <AntDesign
          onPress={() => navigation.navigate("config")}
          style={{ position: "absolute", right: 20 }}
          name="setting"
          size={40}
          color="#fff"
        />
      </Footer>
      <AdMobBanner
        style={{ alignItems: "center", justifyContent: "center" }}
        bannerSize="banner"
        adUnitID={adUnitID} // Test ID, Replace with your-admob-unit-id
        onDidFailToReceiveAdWithError={(e) => console.log(e)}
      />
      <ModalDrink isChose={setShowModal} showModal={showModal} />
    </AppContainerBackGround>
  );
};

export default Home;
