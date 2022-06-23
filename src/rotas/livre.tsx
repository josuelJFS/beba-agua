import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import React from "react";
import peso from "../pages/peso";
import hora_acorda from "../pages/hora_acorda";
import hora_dormir from "../pages/hora_dormir";
import home from "../pages/home";
const Stack = createStackNavigator();

const Livre = () => {
  return (
    <Stack.Navigator detachInactiveScreens={false}>
      <Stack.Screen
        name="init"
        component={peso}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="hora_acorda"
        component={hora_acorda}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <Stack.Screen
        name="hora_dormir"
        component={hora_dormir}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="home"
        component={home}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </Stack.Navigator>
  );
};

export default Livre;
