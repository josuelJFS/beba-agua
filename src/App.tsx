import React, { useState, useEffect, useRef, useContext } from "react";
import "react-native-gesture-handler";
import { AutenticacaoProvider, useAutenticacaoContext } from "./contexts/autenticacao";
import Routas from "./rotas/index";
import { NavigationContainer } from "@react-navigation/native";
import * as Updates from "expo-updates";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";
import { Alert, Platform } from "react-native";
import { useFonts, Roboto_900Black, Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";
import { Inter_700Bold, Inter_600SemiBold, Inter_800ExtraBold } from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading";

function App() {
  useEffect(() => {
    async function updateApp() {
      try {
        const { isAvailable } = await Updates.checkForUpdateAsync();
        if (isAvailable) {
          Alert.alert(
            "UPDATE ",
            "Nova Atualização Disponivel",
            [
              {
                text: "ATUALIZAR",
                onPress: async () => {
                  await Updates.fetchUpdateAsync();
                  await Updates.reloadAsync();
                },
              },
            ],
            { cancelable: false },
          );
        }
      } catch (error) {
        console.log("error update nao pode verificar no expo cliente");
      }
    }
    updateApp();
  }, []);

  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }

  changeScreenOrientation();

  const [fontsLoaded] = useFonts({
    Roboto_900Black,
    Roboto_400Regular,
    Inter_700Bold,
    Roboto_500Medium,
    Inter_600SemiBold,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <AutenticacaoProvider>
        <Routas />
      </AutenticacaoProvider>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

export default App;
