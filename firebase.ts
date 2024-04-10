import {getApp, getApps, initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB1ErUT5gjkYsk-jdtEBJxbhBEdlbwSlf4",
  authDomain: "chat-gpt-clone-3a80d.firebaseapp.com",
  projectId: "chat-gpt-clone-3a80d",
  storageBucket: "chat-gpt-clone-3a80d.appspot.com",
  messagingSenderId: "988423673605",
  appId: "1:988423673605:web:b8ad57d79097270a08c96c",
  measurementId: "G-YKWCSZQ8DK"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app=getApps().length? getApp(): initializeApp(firebaseConfig);

const db=getFirestore(app);

export {db}