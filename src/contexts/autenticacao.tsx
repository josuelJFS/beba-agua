import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Icontext {
  setUserInfo: (e: React.SetStateAction<userInfoProps>) => void;
  userInfo: userInfoProps;
  logado: boolean;
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
};

const AutenticacaoContext = createContext<Icontext>({} as Icontext);

const AutenticacaoProvider: React.FC = ({ children }) => {
  const [userInfo, setUserInfo] = useState<userInfoProps>({} as userInfoProps);
  const [logado, setLogado] = useState<boolean>(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const dadosUser = JSON.parse(await AsyncStorage.getItem("user")) || {};
    if (Object.values(dadosUser).length === 0) {
      setLogado(false);
    } else {
      setUserInfo(dadosUser);
      setLogado(true);
    }
  }

  return (
    <AutenticacaoContext.Provider value={{ setUserInfo, userInfo, logado }}>{children}</AutenticacaoContext.Provider>
  );
};

const useAutenticacaoContext = () => {
  const context = useContext(AutenticacaoContext);

  return {
    ...context,
  };
};

export { AutenticacaoProvider, useAutenticacaoContext };
