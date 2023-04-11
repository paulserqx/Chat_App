import { TPopups } from "components";
import { createContext, useContext, useState } from "react";
import { IUserInfo } from "services";

interface PopupContextProviderProps {
  children: any;
}

interface PopupContextProps {
  popupOpened: TPopups;
  togglePopup: (type?: TPopups) => () => void;
  changeUserInfo: (user: IUserInfo) => () => void;
  userInfo?: IUserInfo;
}

const PopupContext = createContext<PopupContextProps>({
  popupOpened: "null",
  togglePopup: () => () => {},
  changeUserInfo: () => () => {},
});

export const PopupContextProvider: React.FC<PopupContextProviderProps> = ({
  children,
}) => {
  const [popupOpened, setPopupOpened] = useState<TPopups>("null");
  const [userInfo, setUserInfo] = useState<IUserInfo | undefined>(undefined);

  const togglePopup = (type?: TPopups) => () => {
    setPopupOpened(type || "null");
    document.body.style.overflow = type !== "null" ? "hidden" : "auto";
  };

  const changeUserInfo = (user: IUserInfo) => () => {
    setUserInfo(user);
  };

  return (
    <PopupContext.Provider
      value={{ userInfo, changeUserInfo, popupOpened, togglePopup }}
    >
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => useContext(PopupContext);
