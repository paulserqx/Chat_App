import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TPopups } from "components";
import { IUserInfo } from "services/firebase";

interface IPopupProps {
  popupOpened: TPopups;
  userInfo?: IUserInfo;
}

const initialState: IPopupProps = {
  popupOpened: "null",
  userInfo: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    togglePopup(state, popup: PayloadAction<TPopups>) {
      state.popupOpened = popup.payload;
      document.body.style.overflow =
        popup.payload !== "null" ? "hidden" : "auto";
    },
    changeUserInfo(state, user: PayloadAction<IUserInfo>) {
      state.userInfo = user.payload;
    },
  },
});

export const { changeUserInfo, togglePopup } = userSlice.actions;
export default userSlice.reducer;
