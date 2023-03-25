import { auth } from "services";

export const useUser = () => {
  return { user: auth.currentUser };
};
