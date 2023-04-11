import { User, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { IUserInfo, auth, firebaseApi } from "services";

interface UserContextProviderProps {
  children: any;
}

interface UserContextProps {
  user: null | User;
  changeStatus: (status: string) => () => Promise<void>;
}

const UserContext = createContext<UserContextProps>({
  user: auth.currentUser,
  changeStatus: () => async () => {},
});

export const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const changeStatus = (status: string) => async () => {
    await firebaseApi.POST.update.status(
      status,
      auth.currentUser?.displayName || "Anonymous User"
    );
  };

  return (
    <UserContext.Provider value={{ changeStatus, user: auth.currentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
