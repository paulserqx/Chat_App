interface IFirebaseErrors {
  [key: string]: string;
  "user-not-found": string;
  "wrong-password": string;
  "invalid-email": string;
  "weak-password": string;
  "email-already-in-use": string;
  "popup-closed-by-user": string;
}

export const FirebaseErrors: IFirebaseErrors = {
  "user-not-found": "User could not be found.",
  "wrong-password": "Password is Incorrect.",
  "invalid-email": "Invalid email please check your spelling.",
  "weak-password": "Please use a stronger password.",
  "email-already-in-use": "Email is already in use.",
  "popup-closed-by-user": "Google login popup was closed by the user.",
};
