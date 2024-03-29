import React, { useEffect, useState } from "react";
import { Container, Img, Pointer } from "./style";

import RollPickerNative from "roll-picker-native";
import { ListViewBase, Text } from "react-native";
import { View } from "moti";

type props = {
  img: any;
  list: Array<string>;
  list2?: Array<string>;
  index?: number;
  index2?: number;
  value1?: (e: number) => void;
  value2?: (e: number) => void;
};

const ImgPickList: React.FC<props> = ({ img, list, list2, index = 0, index2 = 0, value1, value2 }) => {
  const [listData, setList] = useState(list);
  const [listData2, setList2] = useState(list2);

  return (
    <Container>
      <Img resizeMode="cover" source={img} />
      <View style={{ flexDirection: "row", width: 100, justifyContent: "center", alignItems: "center" }}>
        <RollPickerNative
          items={listData}
          index={index}
          onIndexChange={(index: number) => value1(index)}
          containerStyle={{ backgroundColor: "transparent" }}
          selectStyle={{ backgroundColor: "transparent" }}
          selectTextStyle={{ color: "#fff", fontFamily: "Inter_800ExtraBold", fontSize: 16 }}
          itemTextStyle={{ fontFamily: "Inter_800ExtraBold", color: "#AEDDFF" }}
          selectHeight={40}
        />
        {list2 && <Pointer>:</Pointer>}
        {list2 && (
          <RollPickerNative
            items={listData2}
            index={index2}
            onIndexChange={(index: number) => value2(index)}
            containerStyle={{ backgroundColor: "transparent" }}
            selectStyle={{ backgroundColor: "transparent" }}
            selectTextStyle={{ color: "#fff", fontFamily: "Inter_800ExtraBold", fontSize: 16 }}
            itemTextStyle={{ fontFamily: "Inter_800ExtraBold", color: "#AEDDFF" }}
            selectHeight={40}
          />
        )}
      </View>
    </Container>
  );
};

export default ImgPickList;
