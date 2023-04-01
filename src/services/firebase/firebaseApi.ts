import { FirebaseError } from "firebase/app";
import defaultUser from "../../../public/imgs/default_user.jpg";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
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
  remove,
  set,
  update,
} from "firebase/database";
import React, { Dispatch } from "react";
import { auth } from "./firebaseInit";
import {
  TError,
  IEmailAndPasswordSignIn,
  GetAllRoomsResponse,
  IMessage,
} from "./types";
import { Statuses } from "types";
import { EmojiClickData } from "emoji-picker-react/dist/types/exposedTypes";
import { IEmoji, IEmojiInfo } from "collections";

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

const changeStatus = async (status: string) => {
  const usersPathRef = ref(db, `users/${auth.currentUser?.uid}`);
  set(usersPathRef, {
    status,
  });
};

const getUserStatus = async (
  setter: React.Dispatch<React.SetStateAction<Statuses>>
) => {
  const statusRef = ref(db, `users/${auth.currentUser?.uid}`);
  onValue(statusRef, (status) => {
    if (status.val() === null) {
      setter("online");
    } else {
      const value = status.val().status;
      setter(value);
    }
  });
};

const createRoom = async (roomName: string): Promise<void | ErrorResponse> => {
  try {
    const doesExist = (await get(child(dbRef, `rooms/${roomName}`))).exists();

    if (doesExist) throw Error("Room already exists!");

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
      uid: auth.currentUser?.uid,
      message,
      profileImg,
      edited: false,
      timePosted: Date.now(),
      emojis: [],
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
    if (!msgs.val()) {
      setter([]);
    } else {
      const data = Object.values(msgs.val()) as any;
      // Fixed a unexpected bug where after a client refresh
      // the msgs.val() returns slug:{data} instead of just data
      if (msgs.key === roomName) {
        setter(Object.values(data));
      } else {
        setter(Object.values(data[0]));
      }
    }
  });
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

const editMessage = async (
  prevMessage: IMessage,
  room: string,
  newMessage: string
) => {
  const messageRef = ref(db, `messages/${room}/${prevMessage.key}`);
  update(messageRef, {
    ...prevMessage,
    message: newMessage,
    edited: true,
  });
};

const addEmoji = async (
  message: IMessage,
  room: string,
  emoji: EmojiClickData
) => {
  const emojiesRef = ref(
    db,
    `messages/${room}/${message.key}/emojies/${emoji.unified}`
  );

  const emojiPath = `messages/${room}/${message.key}/emojies`;

  const emojiesValue = await get(child(ref(db), emojiPath));

  const newEmoji = push(emojiesRef);
  if (emojiesValue.val() === null) {
    await set(newEmoji, {
      icon: emoji.unified,
      from: auth.currentUser?.uid,
      key: newEmoji.key,
    });
    return;
  }

  const emojiType = emojiesValue.val()[emoji.unified] || false;

  if (emojiType) {
    const usersReacted: any[] = Object.values(emojiType);
    let alreadyReacted = false;
    usersReacted.map((emoji) => {
      if (emoji.from === auth.currentUser?.uid) {
        alreadyReacted = true;
      }
    });

    if (alreadyReacted) {
      return "You have already reacted with this emoji!";
    }
  }

  await set(newEmoji, {
    icon: emoji.unified,
    from: auth.currentUser?.uid,
    key: newEmoji.key,
  });
};

const reactWithEmoji = async (
  room: string,
  messageKey: string,
  emoji: string
) => {
  const emojiRef = ref(db, `messages/${room}/${messageKey}/emojies/${emoji}`);

  const newEmoji = push(emojiRef);
  set(newEmoji, {
    from: auth.currentUser?.uid,
    icon: emoji,
    key: newEmoji.key,
  });
};

const removeEmoji = async (
  room: string,
  message: IMessage,
  emoji: IEmojiInfo
) => {
  const emojiRef = ref(
    db,
    `messages/${room}/${message.key}/emojies/${emoji.icon}/${emoji.key}`
  );
  await remove(emojiRef);
};

const getEmojis = async (
  room: string,
  message: IMessage,
  setter: Dispatch<React.SetStateAction<IEmoji[]>>
) => {
  const emojisRef = ref(db, `messages/${room}/${message.key}/emojies`);

  onValue(emojisRef, (emojis) => {
    if (!emojis.val()) {
      setter([]);
    } else {
      const EmojisArray: any = Object.entries(emojis.val());
      setter(
        EmojisArray.map((emoji: any) => {
          const key = emoji[0];
          const data = emoji[1];
          const structuredData = Object.values(data);
          return {
            emoji: structuredData,
          };
        })
      );
    }
  });
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
      edit: editMessage,
    },
    changeStatus,
    emoji: {
      add: addEmoji,
      react: reactWithEmoji,
    },
  },
  GET: {
    allRooms: getAllRooms,
    messages: getMessages,
    user: getUserStatus,
    emojis: getEmojis,
  },
  DELETE: {
    emoji: removeEmoji,
  },
};
