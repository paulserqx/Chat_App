import { auth, firebaseApi } from "services";

export const useUser = () => {
  const handleChangeStatus = (status: string) => async () => {
    await firebaseApi.POST.update.status(
      status,
      auth.currentUser?.displayName || "Anonymous User"
    );
  };

  return {
    user: auth.currentUser,
    changeStatus: handleChangeStatus,
  };
};
