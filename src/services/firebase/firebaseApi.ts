import { FirebaseError } from "firebase/app";
import defaultUser from "../../../public/imgs/default_user.jpg";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as _signOut,
  updateProfile,
  User,
  UserCredential,
} from "firebase/auth";
import {
  child,
  get,
  getDatabase,
  off,
  onValue,
  push,
  ref,
  set,
} from "firebase/database";
import React from "react";
import { auth } from "./firebaseInit";
import { TError, IEmailAndPasswordSignIn, GetAllRoomsResponse } from "./types";

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

const sendMessage = async (
  roomName: string,
  message: string,
  user: string,
  profileImg: string
): Promise<void | ErrorResponse> => {
  try {
    const roomRef = ref(db, `messages/${roomName}`);
    const newMessage = push(roomRef);
    await set(newMessage, {
      key: newMessage.key,
      author: user,
      message,
      profileImg,
      timePosted: Date.now(),
    });
  } catch (error: any) {
    const FirebaseError: TError = error;
    return {
      type: "error",
      error: FirebaseError,
    };
  }
};

const getMessages = async (
  roomName: string,
  setter: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const roomMessagesRef = ref(db, `messages/${roomName}`);
  onValue(roomMessagesRef, (msgs) => {
    if (!msgs.val()) return;
    setter(Object.values(msgs.val()));
  });
};

const getAllRoomsOnce = async (): Promise<GetAllRoomsResponse[]> => {
  const rooms = await get(child(dbRef, "rooms/"));
  return rooms.val();
};

const getAllRooms = async (
  setter: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const roomsRef = ref(db, "rooms/");
  onValue(roomsRef, (rooms) => {
    if (!rooms.val()) return;
    const result: GetAllRoomsResponse = rooms.val();
    setter(Object.values(result).map((room) => room.name));
  });
};

const createUserWithPassword = async (
  e: React.FormEvent,
  { email, password, username }: IEmailAndPasswordSignIn
): Promise<ErrorResponse | DataResponse> => {
  e.preventDefault();

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await setAdditionUserInfo(username || "Anonymous User");
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

const setAdditionUserInfo = async (username: string) => {
  if (!auth.currentUser) return;
  updateProfile(auth.currentUser, {
    displayName: username,
    photoURL: defaultUser.src,
  });
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
  { email, password }: IEmailAndPasswordSignIn
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
    off(ref(db));
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
    message: {
      send: sendMessage,
    },
  },
  GET: {
    allRoomsOnce: getAllRoomsOnce,
    allRooms: getAllRooms,
    messages: getMessages,
  },
};
