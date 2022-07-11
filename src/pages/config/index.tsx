import React, { useEffect, useState } from "react";
import { Switch } from "react-native";
import { AppContainerBackGround, AppTitulo } from "../../components/uiAppStyle/style";
import { useAutenticacaoContext } from "../../contexts/autenticacao";
import { Container } from "./style";
import * as Notifications from "expo-notifications";
import {
  AndroidNotificationPriority,
  AndroidNotificationVisibility,
  cancelAllScheduledNotificationsAsync,
  getAllScheduledNotificationsAsync,
} from "expo-notifications";
import Load from "../../components/load";
import { createCalendar } from "../../service/calendar";

async function execultTimeIntervalNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Notificações do app ativadas",
      priority: AndroidNotificationPriority.HIGH,
      vibrate: [0, 250, 250, 250],
    },
    trigger: {
      seconds: 1,
    },
  });
}

const Config: React.FC = () => {
  const { setUserInfo, userInfo, setLoad } = useAutenticacaoContext();
  const [isEnabled, setIsEnabled] = useState(userInfo.notificarion);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [isEnabled2, setIsEnabled2] = useState(userInfo.agenda);
  const toggleSwitch2 = () => setIsEnabled2((previousState) => !previousState);
  useEffect(() => {
    setUserInfo((props) => ({ ...props, agenda: isEnabled2, notificarion: isEnabled }));
    if (isEnabled) {
      execultTimeIntervalNotification();
    }
  }, [isEnabled]);

  useEffect(() => {
    setUserInfo((props) => ({ ...props, agenda: isEnabled2 }));
  }, [isEnabled2]);
  return (
    <AppContainerBackGround colors={["#35DBFF", "#0C9BFF"]} start={{ x: -0.3, y: 0.4 }}>
      <Load />
      <Container>
        <AppTitulo>Notificação</AppTitulo>
        <Switch
          trackColor={{ false: "#767577", true: "#11ec82" }}
          thumbColor={isEnabled ? "#11ec82" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {
            toggleSwitch();
          }}
          value={isEnabled}
        />
      </Container>
      <Container>
        <AppTitulo>Agenda</AppTitulo>
        <Switch
          trackColor={{ false: "#767577", true: "#11ec82" }}
          thumbColor={isEnabled2 ? "#11ec82" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {
            toggleSwitch2();
            createCalendar(userInfo?.horaAcorda, userInfo?.horaDormi);
          }}
          value={isEnabled2}
        />
      </Container>
    </AppContainerBackGround>
  );
};

export default Config;
