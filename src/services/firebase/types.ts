import { FirebaseError } from "firebase/app";
import { Statuses } from "types";

export interface IEmailAndPasswordSignIn {
  email: string;
  password: string;
  username?: string;
}

export type TError = FirebaseError;

export interface IRoom {
  name: string;
  icon: string;
  members: {
    [key: string]: { user: string };
  };
}

export type GetAllRoomsResponse = {
  [key: string]: {
    name: string;
    icon: string;
    members: {
      [key: string]: { user: string };
    };
  };
};

export type GetRoomResponse = {
  [key: string]: {
    user: string;
  };
};

export interface IUserInfo {
  memberSince: string;
  name: string;
  status: Statuses;
  uid: string;
  profileImg: string;
  banner: string;
}

export interface IMessage {
  author: string;
  message: string;
  profileImg: string;
  uid: string;
  key: string;
  timePosted: number;
  edited: boolean;
  greeting: boolean;
}
