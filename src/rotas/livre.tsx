import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import React from "react";
import peso from "../pages/peso";
import horaDormir from "../pages/hora_dormir";
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
        name="horaDormir"
        component={horaDormir}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </Stack.Navigator>
  );
};

export default Livre;
