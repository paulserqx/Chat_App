import { useEffect, useRef, useState } from "react";
import { auth, firebaseApi } from "services";

export const useUser = () => {
  const handleChangeStatus = (status: string) => async () => {
    await firebaseApi.POST.changeStatus(status);
  };

  return {
    user: auth.currentUser,
    changeStatus: handleChangeStatus,
  };
};
