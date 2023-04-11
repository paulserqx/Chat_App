import { User } from "firebase/auth";
import { createContext, useContext, useState } from "react";
import { auth, firebaseApi } from "services";

interface UserContextProviderProps {
  children: any;
}

interface UserContextProps {
  user: User | null;
  changeStatus: (status: string) => () => Promise<void>;
}

const UserContext = createContext<UserContextProps>({
  user: null,
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
