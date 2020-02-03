import axios from 'axios';
import firebase from 'firebase'
import firebaseConfig from '../config/firebaseConfig'
firebase.initializeApp(firebaseConfig)

export const getCoaches = async () => {
  let res = await axios.get('/api/firebase/coaches')
  return res.data
}

export const getTasks = async () => {
  let res = await axios.get('/api/firebase/tasks')
  return res.data
}

export const getActiveTasks = async () => {
  let res = await axios.get('/api/firebase/active_tasks')
  return res.data
}

export const addTask = async (task) => {
  let res = await axios.post('/api/firebase/tasks', {
    task
  })
  return res.data
}

export const findCoach = async (name) => {
  let res = await axios.post('/api/firebase/coach', {
    name
  })
  return res.data
}

export const findTasksPerCoach = async (name) => {
  let res = await axios.post('/api/firebase/findTasksPerCoach', {
    name
  })
  return res.data
}

export const changeTaskStatus = async (task) => {
  let res = await axios.post('/api/firebase/changeTaskStatus', {
    task
  })
  return res.data
}

export const assignTask = async (taskObj) => {
  let res = await axios.post('/api/firebase/assignTask', {
    taskObj
  })
  return res.data
}

export const fetchLogs = async (id) => {
  let res = await axios.post('/api/firebase/fetchLogs', {id})
  return res.data
}

export const updateTask = async (task) => {
  let res = await axios.post('/api/firebase/updateTask', {
    task
  })
  return res.data
}

export const createNewCoach = async (coach) => {
  const photoURL = await uploadPhoto(coach.photo)
  coach.photo = photoURL
  let res = await axios.post('/api/firebase/createNewCoach', coach )
  return res.data
}

const uploadPhoto = async photo => {
  const storageRef = firebase.storage().ref('photos');
  const imageRef = storageRef.child(photo.name)
  const upload = await imageRef.put(photo)
  const url = await upload.ref.getDownloadURL()
  return url
}
