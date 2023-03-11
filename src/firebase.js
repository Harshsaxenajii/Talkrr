import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATPm5mxTC8ye3Y5C1v6rBkrT1ZmK5iOh0",
  authDomain: "chat-app-73359.firebaseapp.com",
  projectId: "chat-app-73359",
  storageBucket: "chat-app-73359.appspot.com",
  messagingSenderId: "816782516996",
  appId: "1:816782516996:web:760f8b746940e658c6a651",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage();
export const auth = getAuth(app);
