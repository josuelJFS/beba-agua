import React, { useEffect, useState } from "react";
import { Modal } from "react-native";
import { ButtonDrinkNow, ButtonName, ContainerFooter, ContainerTop, Igual, ImgModal, InputML, ModalBox } from "./style";
import copoImg from "../../img/copobotao.png";

type props = {
  showModal: boolean;
  isChose?: (e: boolean) => void;
};

const ModalDrink: React.FC<props> = ({ showModal, isChose }) => {
  const [ml, setMl] = useState("350");
  const [show, setShow] = useState<boolean>(false);

  function returnUser() {
    isChose(false);
    setShow(false);
  }

  useEffect(() => {
    if (showModal) setShow(showModal);
  }, [showModal]);

  return (
    <Modal animationType="slide" transparent={true} visible={showModal} onRequestClose={() => console.log(1)}>
      <ModalBox>
        <ContainerTop>
          <ImgModal source={copoImg} />
          <Igual>=</Igual>
          <InputML value={ml} onChangeText={setMl} keyboardType="numeric" />
          <Igual>ml</Igual>
        </ContainerTop>
        <ContainerFooter>
          <ButtonDrinkNow onPress={returnUser}>
            <ButtonName>BEBER</ButtonName>
          </ButtonDrinkNow>
        </ContainerFooter>
      </ModalBox>
    </Modal>
  );
};

export default ModalDrink;
