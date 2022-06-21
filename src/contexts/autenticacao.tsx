import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface Icontext {
  setUserInfo: (e: any) => void;
  userInfo: any;
}

const AutenticacaoContext = createContext<Icontext>({} as Icontext);

const AutenticacaoProvider: React.FC = ({ children }) => {
  const [userInfo, setUserInfo] = useState<boolean>(false);

  return <AutenticacaoContext.Provider value={{ setUserInfo, userInfo }}>{children}</AutenticacaoContext.Provider>;
};

const useAutenticacaoContext = () => {
  const context = useContext(AutenticacaoContext);

  return {
    ...context,
  };
};

export { AutenticacaoProvider, useAutenticacaoContext };
