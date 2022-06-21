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
import peso from "../../img/peso.png";
const listDados = [];

for (let index = 0; index < 700; index++) {
  listDados.push(index + "kg");
}

const Peso: React.FC = () => {
  return (
    <AppContainerBackGround colors={["#35DBFF", "#0C9BFF"]} start={{ x: -0.3, y: 0.4 }}>
      <ContainerHeader>
        <AppTitulo>Quanto você pesa ?</AppTitulo>
        <AppSubTitulo>
          precisamos saber o seu peso para desenvolver um planejamento personalisado para você
        </AppSubTitulo>
      </ContainerHeader>
      <ContainerBody>
        <ImgPickList list={listDados} img={peso}></ImgPickList>
      </ContainerBody>
      <ContainerFoot>
        <AppButton>
          <AppTextButton>Proxímo</AppTextButton>
        </AppButton>
      </ContainerFoot>
    </AppContainerBackGround>
  );
};

export default Peso;
