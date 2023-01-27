import { createContext, useState } from "react";

const PopupContext = createContext();

export function PopupProvider({ children }) {
  const [msgModalOpen, setMsgModalOpen] = useState();
  const [popupMessage, setPopupMessage] = useState();

  function handleOpenMsgModal(message) {
    setMsgModalOpen(false);
    setTimeout(() => {
      setPopupMessage(message);
      setMsgModalOpen(true);
    }, 500);
  }

  function handleCloseMsgModal(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setMsgModalOpen(false);
  }

  return (
    <PopupContext.Provider
      value={{
        msgModalOpen,
        popupMessage,
        handleOpenMsgModal,
        handleCloseMsgModal,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
}

export default PopupContext;
