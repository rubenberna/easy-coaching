const firebase = require('firebase')
const storage = require('firebase/storage')
const firebaseConfig = require('./firebaseConfig')
const admin = require("firebase-admin")

admin.initializeApp({
  credential: admin.credential.cert({
    "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "project_id": process.env.FIREBASE_PROJECT_ID
  }),
  databaseURL: "https://coaching-cb8ef.firebaseio.com"
});

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore();

// Shortcuts for db collections
const coaches = db.collection('coaches')
const offices = db.collection('offices')
const tasks = db.collection('tasks')
const logs = db.collection('logs')
const storageRef = firebase.storage().ref('photos');

module.exports = {
  coaches,
  offices,
  tasks,
  logs,
  storageRef,
  admin
}
