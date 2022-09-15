import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
  getFirestore,
  collection,
  Timestamp,
  addDoc,
  query,
  getDocs,
} from "firebase/firestore/lite";
import { getStorage, ref } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB77Q-GrYOyZEvJvHmTsDNb-Qc2418YW4A",
  authDomain: "twitter-devs.firebaseapp.com",
  projectId: "twitter-devs",
  storageBucket: "twitter-devs.appspot.com",
  messagingSenderId: "429556251933",
  appId: "1:429556251933:web:0a3fbf0e180fd8a937b5f4",
  measurementId: "G-RFKLGDCDXD",
};

const app = firebase.initializeApp(firebaseConfig);

const db = getFirestore(app);

const mapUserFromFirebaseAuthToUser = (user) => {
  const { photoURL, email, displayName, uid } = user;
  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  };
};

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null;
    onChange(normalizedUser);
  });
};

export const loginWithGithub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithPopup(githubProvider);
};

export const addTweet = async ({ avatar, content, userId, userName }) => {
  return await addDoc(collection(db, "tweets"), {
    avatar,
    content,
    userId,
    userName,
    createdAt: Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  });
};

export const fetchLatestTweets = async () => {
  const q = query(collection(db, "tweets"));
  const querySnap = await getDocs(q);
  const data = querySnap.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return data;
};

export const uploadImage = (file) => {
  const storage = getStorage();

  const reference = ref(storage, `images/${file.name}`);
  const task = reference.put(file);
  return task;
};
