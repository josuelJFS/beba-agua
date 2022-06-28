import React, { useEffect, useState } from "react";
import { IconsMaterialCommunity } from "../../icons";
import { Theme } from "../../theme/theme";
import { Container } from "./style";

type props = {
  porcent: number;
};

const CopsHeader: React.FC<props> = ({ porcent = 0 }) => {
  const [porc, setPorc] = useState(0);
  useEffect(() => {
    setPorc(porcent);
  }, [porcent]);
  return (
    <Container>
      <IconsMaterialCommunity
        name="cup"
        size={30}
        color={porc >= 20 ? Theme.colors.blueCopCheio : Theme.colors.blueCop}
      />
      <IconsMaterialCommunity
        name="cup"
        size={30}
        color={porc >= 40 ? Theme.colors.blueCopCheio : Theme.colors.blueCop}
      />
      <IconsMaterialCommunity
        name="cup"
        size={30}
        color={porc >= 60 ? Theme.colors.blueCopCheio : Theme.colors.blueCop}
      />
      <IconsMaterialCommunity
        name="cup"
        size={30}
        color={porc >= 80 ? Theme.colors.blueCopCheio : Theme.colors.blueCop}
      />
      <IconsMaterialCommunity
        name="cup"
        size={30}
        color={porc >= 100 ? Theme.colors.blueCopCheio : Theme.colors.blueCop}
      />
    </Container>
  );
};

export default CopsHeader;
