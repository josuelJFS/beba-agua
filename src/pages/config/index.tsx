import React, { useState } from "react";
import { Switch } from "react-native";
import { AppContainerBackGround, AppTitulo } from "../../components/uiAppStyle/style";
import { useAutenticacaoContext } from "../../contexts/autenticacao";
import { Container } from "./style";

const Config: React.FC = () => {
  const { setAgenda, setNotificacao, agenda, notificacao } = useAutenticacaoContext();
  const toggleSwitch = () => setNotificacao((previousState) => !previousState);

  const toggleSwitch2 = () => setAgenda((previousState) => !previousState);
  return (
    <AppContainerBackGround colors={["#35DBFF", "#0C9BFF"]} start={{ x: -0.3, y: 0.4 }}>
      <Container>
        <AppTitulo>Notificação</AppTitulo>
        <Switch
          trackColor={{ false: "#767577", true: "#11ec82" }}
          thumbColor={notificacao ? "#11ec82" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={notificacao}
        />
      </Container>
      <Container>
        <AppTitulo>Agenda</AppTitulo>
        <Switch
          trackColor={{ false: "#767577", true: "#11ec82" }}
          thumbColor={agenda ? "#11ec82" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch2}
          value={agenda}
        />
      </Container>
    </AppContainerBackGround>
  );
};

export default Config;
