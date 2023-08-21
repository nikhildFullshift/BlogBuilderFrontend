import { Dialog } from "@mui/material";
import React, { useState } from "react";

function Comment(props: any) {
  const { value } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    console.log(isModalVisible);
    setIsModalVisible((p) => !p);
  };

  return (
    <>
      <Modal value={value} isVisible={isModalVisible} />
      <button onClick={toggleModal}>{value}</button>
    </>
  );
}

export default Comment;

const Modal = ({ value, isVisible }) => {
  return isVisible && <Dialog open={isVisible}>{value}</Dialog>;
};
