import { FirebaseError } from "firebase/app";

export interface IEmailAndPasswordSignIn {
  email: string;
  password: string;
  username?: string;
}

export type TError = FirebaseError;

export interface IRoom {
  name: string;
  icon: string;
}

export type GetAllRoomsResponse = {
  [key: string]: { name: string; icon: string };
};

export interface IMessage {
  author: string;
  message: string;
  profileImg: string;
  uid: string;
  key: string;
  timePosted: number;
  edited: boolean;
}
