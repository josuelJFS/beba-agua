import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Icontext {
  setUserInfo: (e: React.SetStateAction<userInfoProps>) => void;
  userInfo: userInfoProps;
  logado: boolean;
  load: boolean;
  setLoad: (e: boolean) => void;
  notificacao: boolean;
  setNotificacao: (e: React.SetStateAction<boolean>) => void;
  agenda: boolean;
  setAgenda: (e: React.SetStateAction<boolean>) => void;
}

export type userInfoProps = {
  peso?: number;
  horaAcorda?: number;
  minAcorda?: number;
  horaDormi?: number;
  minDormi?: number;
  aguaDiariaIdeal?: number;
  porcentagemAguaDiaria?: number;
  quantoTomeiDia?: number;
  mlCopo?: number;
  data?: Date;
};

const AutenticacaoContext = createContext<Icontext>({} as Icontext);

const AutenticacaoProvider: React.FC = ({ children }) => {
  const [userInfo, setUserInfo] = useState<userInfoProps>({} as userInfoProps);
  const [logado, setLogado] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);
  const [notificacao, setNotificacao] = useState<boolean>(false);
  const [agenda, setAgenda] = useState<boolean>(false);

  useEffect(() => {
    loadApp();
  }, []);

  async function loadApp() {
    setLoad(true);
    const dadosUser = JSON.parse(await AsyncStorage.getItem("user")) || {};
    if (Object.values(dadosUser).length === 0) {
      setLogado(false);
    } else {
      setUserInfo(dadosUser);
      setLogado(true);
    }
    setLoad(false);
  }

  return (
    <AutenticacaoContext.Provider
      value={{ setUserInfo, userInfo, logado, load, setLoad, agenda, notificacao, setAgenda, setNotificacao }}
    >
      {children}
    </AutenticacaoContext.Provider>
  );
};

const useAutenticacaoContext = () => {
  const context = useContext(AutenticacaoContext);

  return {
    ...context,
  };
};

export { AutenticacaoProvider, useAutenticacaoContext };
