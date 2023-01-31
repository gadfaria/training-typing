import { useState } from "react";

const useModal = () => {
  const [modalOpen, setModalOpen] = useState(false);

  function close() {
    setModalOpen(false);
    window.location.reload();
  }
  function open() {
    setModalOpen(true);
  }

  return { modalOpen, close, open };
};

export default useModal;
