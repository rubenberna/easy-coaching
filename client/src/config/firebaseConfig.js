import firebase from 'firebase'
import "firebase/auth"

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIRESTORE,
  authDomain: "coaching-cb8ef.firebaseapp.com",
  databaseURL: "https://coaching-cb8ef.firebaseio.com",
  projectId: "coaching-cb8ef",
  storageBucket: "coaching-cb8ef.appspot.com",
  messagingSenderId: "177256331752",
  appId: "1:177256331752:web:037283e376de4476280c5d"
})

const db = firebase.firestore();

// Shortcuts for db collections
const coaches = db.collection('coaches')
const offices = db.collection('offices')
const tasks = db.collection('tasks')
const logs = db.collection('logs')
const storageRef = firebase.storage().ref('photos');

export {
  firebaseApp,
  coaches,
  offices,
  tasks,
  logs,
  storageRef
}