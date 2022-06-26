import React, { useEffect } from "react";
import ImgPickList from "../../components/iconWithPickList";
import {
  AppButton,
  AppContainerBackGround,
  AppSubTitulo,
  AppTextButton,
  AppTitulo,
} from "../../components/uiAppStyle/style";
import { ContainerBody, ContainerFoot, ContainerHeader } from "./style";
import peso from "../../img/peso.png";
import { useNavigation } from "@react-navigation/native";
import { useAutenticacaoContext, userInfoProps } from "../../contexts/autenticacao";
import Load from "../../components/load";
const listDados = [];

for (let index = 0; index < 700; index++) {
  listDados.push(index + "kg");
}

const Peso: React.FC = () => {
  const navigation = useNavigation();
  const { setUserInfo } = useAutenticacaoContext();

  return (
    <AppContainerBackGround colors={["#35DBFF", "#0C9BFF"]} start={{ x: -0.3, y: 0.4 }}>
      <Load />
      <ContainerHeader>
        <AppTitulo>Quanto você pesa ?</AppTitulo>
        <AppSubTitulo>
          precisamos saber o seu peso para desenvolver um planejamento personalisado para você
        </AppSubTitulo>
      </ContainerHeader>
      <ContainerBody>
        <ImgPickList
          value1={(e) => setUserInfo((values) => ({ ...values, peso: e }))}
          index={60}
          list={listDados}
          img={peso}
        ></ImgPickList>
      </ContainerBody>
      <ContainerFoot>
        <AppButton onPress={() => navigation.navigate("hora_acorda")}>
          <AppTextButton>Proxímo</AppTextButton>
        </AppButton>
      </ContainerFoot>
    </AppContainerBackGround>
  );
};

export default Peso;
