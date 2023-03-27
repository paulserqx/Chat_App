import { FirebaseError } from "firebase/app";

export interface IEmailAndPassword {
  email: string;
  password: string;
}

export type TError = FirebaseError;

export interface IRoom {
  name: string;
}

export type GetAllRoomsResponse = {
  [key: string]: { name: string };
};
