import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import React from "react";
import tela_home from "../pages/home";
import config from "../pages/config";
import { Theme } from "../theme/theme";

const Stack = createStackNavigator();

const Logado = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      detachInactiveScreens={false}
    >
      <Stack.Screen
        name="home"
        component={tela_home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="config"
        component={config}
        options={{
          title: "Configuracões",
          headerStyle: {
            backgroundColor: Theme.colors.blueCop,
            shadowColor: Theme.colors.blueCop,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default Logado;
