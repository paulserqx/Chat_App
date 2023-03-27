import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as _signOut,
  UserCredential,
} from "firebase/auth";
import { child, get, getDatabase, onValue, ref, set } from "firebase/database";
import React from "react";
import { auth } from "./firebaseInit";
import { TError, IEmailAndPassword, GetAllRoomsResponse } from "./types";

const provider = new GoogleAuthProvider();

interface ErrorResponse {
  type: "error";
  error: FirebaseError;
}

interface DataResponse<T = UserCredential> {
  type: "data";
  response: T;
}

const db = getDatabase();
const dbRef = ref(db);

const createRoom = async (roomName: string): Promise<void | ErrorResponse> => {
  try {
    const doesExist = await (
      await get(child(dbRef, `rooms/${roomName}`))
    ).exists();

    if (doesExist) throw Error("Room already exists!");

    console.log(doesExist);
    await set(ref(db, "rooms/" + roomName), {
      name: roomName,
    });
  } catch (error: any) {
    const FirbaseError: TError = error;
    return {
      type: "error",
      error: FirbaseError,
    };
  }
};

const getAllRoomsOnce = async (): Promise<GetAllRoomsResponse[]> => {
  const rooms = await get(child(dbRef, "rooms/"));
  return rooms.val();
};

const getAllRooms = async (setter: any) => {
  const roomsRef = ref(db, "rooms/");
  onValue(roomsRef, (rooms) => {
    const result: GetAllRoomsResponse = rooms.val();
    setter(Object.values(result).map((room) => room.name));
  });
};

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
    const FirbaseError: TError = error;
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
    const FirbaseError: TError = error;
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
    const FirbaseError: TError = error;
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
    const FirbaseError: TError = error;
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
    createRoom,
  },
  GET: {
    allRoomsOnce: getAllRoomsOnce,
    allRooms: getAllRooms,
  },
};
