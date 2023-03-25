interface IFirebaseErrors {
  "user-not-found": string;
  "wrong-password": string;
}

export const FirebaseErrors: IFirebaseErrors = {
  "user-not-found": "User could not be found.",
  "wrong-password": "Password is Incorrect",
};
