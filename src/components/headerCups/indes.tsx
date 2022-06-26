import React from "react";
import { IconsMaterialCommunity } from "../../icons";
import { Theme } from "../../theme/theme";
import { ConteinerCups } from "./style";

const HeaderCups: React.FC = () => {
  return (
    <ConteinerCups>
      <IconsMaterialCommunity color={Theme.colors.GreyMedium1} name="cup" size={30} />
      <IconsMaterialCommunity color={Theme.colors.GreyMedium1} name="cup" size={30} />
      <IconsMaterialCommunity color={Theme.colors.GreyMedium1} name="cup" size={30} />
      <IconsMaterialCommunity color={Theme.colors.GreyMedium1} name="cup" size={30} />
      <IconsMaterialCommunity color={Theme.colors.GreyMedium1} name="cup" size={30} />
    </ConteinerCups>
  );
};
export default HeaderCups;
