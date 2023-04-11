import { TPopups } from "components";
import { createContext, useContext, useState } from "react";

interface PopupContextProviderProps {
  children: any;
}

interface PopupContextProps {
  popupOpened: TPopups;
  togglePopup: (type?: TPopups) => () => void;
}

const PopupContext = createContext<PopupContextProps>({
  popupOpened: "null",
  togglePopup: () => () => {},
});

export const PopupContextProvider: React.FC<PopupContextProviderProps> = ({
  children,
}) => {
  const [popupOpened, setPopupOpened] = useState<TPopups>("null");

  const togglePopup = (type?: TPopups) => () => {
    setPopupOpened(type || "null");
    document.body.style.overflow = type !== "null" ? "hidden" : "auto";
  };

  return (
    <PopupContext.Provider value={{ popupOpened, togglePopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => useContext(PopupContext);
