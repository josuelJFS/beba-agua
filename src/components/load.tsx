import { View, ActivityIndicator } from "react-native";
import React from "react";
import { useAutenticacaoContext } from "../contexts/autenticacao";
import { Theme } from "../theme/theme";

const Load = () => {
  const { load } = useAutenticacaoContext();
  return (
    <>
      {load ? (
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            position: "absolute",
            zIndex: 999999999999,
            width: "100%",
            height: "100%",
            backgroundColor: "#ffffffc8",
          }}
        >
          <ActivityIndicator style={{ backgroundColor: "rgba(0,0,0,0)" }} size="large" color={Theme.colors.blueModal} />
        </View>
      ) : null}
    </>
  );
};

export default Load;
