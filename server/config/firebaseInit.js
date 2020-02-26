const firebase = require('firebase')
const storage = require('firebase/storage')
const firebaseConfig = require('./firebaseConfig')

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore();

// Shortcuts for db collections
const coaches = db.collection('coaches')
const tasks = db.collection('tasks')
const logs = db.collection('logs')
const storageRef = firebase.storage().ref('photos');

module.exports = {
  coaches,
  tasks,
  logs,
  storageRef
}
