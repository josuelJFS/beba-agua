import React from "react";
import ImgPickList from "../../components/iconWithPickList";
import {
  AppButton,
  AppContainerBackGround,
  AppSubTitulo,
  AppTextButton,
  AppTitulo,
} from "../../components/uiAppStyle/style";
import { ContainerBody, ContainerFoot, ContainerHeader } from "./style";
import acorda from "../../img/acordar.png";
import { useNavigation } from "@react-navigation/native";
const hora = [];
const min = [];
for (let index = 0; index < 24; index++) {
  const value = index + "";
  hora.push(value.padStart(2, "0"));
}
for (let index = 0; index < 60; index++) {
  const value = index + "";
  min.push(value.padStart(2, "0"));
}

const Peso: React.FC = () => {
  const navigation = useNavigation();
  return (
    <AppContainerBackGround colors={["#35DBFF", "#0C9BFF"]} start={{ x: -0.3, y: 0.4 }}>
      <ContainerHeader>
        <AppTitulo>Que horas você se acorda?</AppTitulo>
        <AppSubTitulo>Vamos te lembrar sempre de beber água depois de se levantar</AppSubTitulo>
      </ContainerHeader>
      <ContainerBody>
        <ImgPickList index={8} index2={30} list={hora} list2={min} img={acorda}></ImgPickList>
      </ContainerBody>
      <ContainerFoot>
        <AppButton onPress={() => navigation.navigate("hora_dormir")}>
          <AppTextButton>Proxímo</AppTextButton>
        </AppButton>
      </ContainerFoot>
    </AppContainerBackGround>
  );
};

export default Peso;
