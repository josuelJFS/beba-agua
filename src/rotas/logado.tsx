import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import React from "react";
import tela_home from "../pages/home";

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
    </Stack.Navigator>
  );
};

export default Logado;
