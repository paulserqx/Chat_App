import { TPopups } from "components";
import { useState } from "react";

export const usePopup = () => {
  const [popupOpened, setPopupOpened] = useState<TPopups | null>(null);

  const togglePopup = (type?: TPopups) => () => {
    setPopupOpened(type || null);
    document.body.style.overflow = type ? "hidden" : "auto";
  };

  return {
    togglePopup,
    popupOpened,
  };
};
