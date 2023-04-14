import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { IUserInfo, auth, firebaseApi } from "services";

interface UserContextProviderProps {
  children: any;
}

interface UserContextProps {
  user: IUserInfo | null;
  changeStatus: (status: string) => () => Promise<void>;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  changeStatus: () => async () => {},
});

export const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [userInfo, setUserInfo] = useState<IUserInfo[]>([]);

  const changeStatus = (status: string) => async () => {
    await firebaseApi.POST.update.status(
      status,
      auth.currentUser?.displayName || "Anonymous User"
    );
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        firebaseApi.GET.user.info(user.uid, setUserInfo);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ changeStatus, user: userInfo[0] }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
