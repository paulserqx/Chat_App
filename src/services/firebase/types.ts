import { FirebaseError } from "firebase/app";

export interface IEmailAndPassword {
  email: string;
  password: string;
}

export type TError = FirebaseError;
