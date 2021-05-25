import React, { useState } from "react";

const InfoF = () => {
  const [eModal, setEModal] = useState(false);
  const [pModal, setPModal] = useState(false);
  const handleEModal = () => setEModal(!eModal);
  const handlePModal = () => setPModal(!pModal);
  return { eModal, pModal, handleEModal, handlePModal };
};

export default InfoF;
