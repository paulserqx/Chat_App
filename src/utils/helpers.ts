import { IRoom, IUserInfo } from "services";

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

export const hasUserJoined = (room: IRoom, userId: string) => {
  const userHasJoined = Object.values(room.members)
    .map((el) => el.user)
    .indexOf(userId || "!not joined!");

  return userHasJoined >= 0 ? true : false;
};

export const sortMembers = (
  a: IUserInfo | undefined,
  b: IUserInfo | undefined
): number => {
  if (a === undefined || b === undefined) return 0;

  const weight = {
    online: 4,
    idle: 3,
    "do-not-disturb": 2,
    invisible: 1,
  };

  const firstEl = weight[a.status || "invisible"];
  const secondEl = weight[b.status || "invisible"];

  if (firstEl > secondEl) return -1;
  if (firstEl === secondEl) return 0;
  if (firstEl < secondEl) return 1;

  return 0;
};
