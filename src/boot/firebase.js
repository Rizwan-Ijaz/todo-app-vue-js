import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAoO3Je0O3VPUGb7Z8LfWWn8ITyf122UY8",
  authDomain: "todo-app-57ac5.firebaseapp.com",
  databaseURL: "https://todo-app-57ac5-default-rtdb.firebaseio.com",
  projectId: "todo-app-57ac5",
  storageBucket: "todo-app-57ac5.appspot.com",
  messagingSenderId: "944454658307",
  appId: "1:944454658307:web:097d4e5507f42199996136"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAuth = firebaseApp.auth();
const firebaseDb = firebaseApp.database();

export { firebaseAuth, firebaseDb };
