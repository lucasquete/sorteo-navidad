
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCtOtEoERLpFl7lPjtXqryzre7JjxQkFpw",
  authDomain: "reactchat-d7394.firebaseapp.com",
  projectId: "reactchat-d7394",
  storageBucket: "reactchat-d7394.appspot.com",
  messagingSenderId: "721894861690",
  appId: "1:721894861690:web:a511de09e32e99e95644c3"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app)

export {storage};
