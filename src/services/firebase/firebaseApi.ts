import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as _signOut,
  UserCredential,
} from "firebase/auth";
import React from "react";
import { auth } from "./firebaseInit";
import { Error, IEmailAndPassword } from "./types";

const provider = new GoogleAuthProvider();

interface ErrorResponse {
  type: "error";
  error: FirebaseError;
}

interface DataResponse<T = UserCredential> {
  type: "data";
  response: T;
}

const createUserWithPassword = async (
  e: React.FormEvent,
  { email, password }: IEmailAndPassword
): Promise<ErrorResponse | DataResponse> => {
  e.preventDefault();

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return {
      type: "data",
      response: res,
    };
  } catch (error: any) {
    const FirbaseError: Error = error;
    return {
      type: "error",
      error: FirbaseError,
    };
  }
};

const signInWithGoogle = async (
  e: React.FormEvent
): Promise<ErrorResponse | DataResponse> => {
  e.preventDefault();

  try {
    const res = await signInWithPopup(auth, provider);
    return {
      type: "data",
      response: res,
    };
  } catch (error: any) {
    const FirbaseError: Error = error;
    return {
      type: "error",
      error: FirbaseError,
    };
  }
};

const signInWithPassword = async (
  e: React.FormEvent,
  { email, password }: IEmailAndPassword
): Promise<ErrorResponse | DataResponse> => {
  e.preventDefault();

  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return {
      type: "data",
      response: res,
    };
  } catch (error: any) {
    const FirbaseError: Error = error;
    return {
      type: "error",
      error: FirbaseError,
    };
  }
};

const signOut = async (): Promise<ErrorResponse | DataResponse<void>> => {
  try {
    const res = await _signOut(auth);
    return {
      type: "data",
      response: res,
    };
  } catch (error: any) {
    const FirbaseError: Error = error;
    return {
      type: "error",
      error: FirbaseError,
    };
  }
};

export const firebaseApi = {
  POST: {
    signIn: {
      withPassword: signInWithPassword,
      withGoogle: signInWithGoogle,
    },
    signOut,
    signUp: {
      withPassword: createUserWithPassword,
    },
  },
};
