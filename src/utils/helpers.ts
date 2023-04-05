import { User } from "firebase/auth";
import { IRoom } from "services";

export const shortenDisplayName = (name: string) => {
  if (name.length > 7) {
    return `${name?.slice(0, -6)}...`;
  } else {
    return name;
  }
};

export const transformErrorMessage = (msg: string) => {
  return msg.split("/")[1].slice(0, -2);
};

export const hasUserJoined = (room: IRoom, user: User | null) => {
  const userHasJoined = Object.values(room.members)
    .map((el) => el.user)
    .indexOf(user?.uid || "omromronsfnan");

  return userHasJoined >= 0 ? true : false;
};
