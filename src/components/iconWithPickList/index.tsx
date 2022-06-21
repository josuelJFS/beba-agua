import React, { useEffect, useState } from "react";
import { Container, Img } from "./style";

import RollPickerNative from "roll-picker-native";
import { ListViewBase } from "react-native";

type props = {
  img: any;
  list: Array<string>;
};

const ImgPickList: React.FC<props> = ({ img, list }) => {
  const [index, setIndex] = useState(60);
  const [listData, setList] = useState(list);

  return (
    <Container>
      <Img resizeMode="cover" source={img} />
      <RollPickerNative
        items={listData}
        index={index}
        onIndexChange={(index: number) => console.log(index)}
        containerStyle={{ backgroundColor: "transparent" }}
        selectStyle={{ backgroundColor: "transparent" }}
        selectTextStyle={{ color: "#fff", fontFamily: "Inter_800ExtraBold", fontSize: 16 }}
        itemTextStyle={{ fontFamily: "Inter_800ExtraBold", color: "#AEDDFF" }}
        selectHeight={40}
      />
    </Container>
  );
};

export default ImgPickList;
