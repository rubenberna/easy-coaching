import axios from 'axios';
import {
  coachesGET,
  coachesSingleGET,
  coachesNEW,
  coachesPUT
} from './firebase/coaches'
import { reassignTaskSF, changeTaskStatusSF, createTaskSF } from './sfQueries'

export const getCoaches = async () => {
  let res = await coachesGET()
  return res
} // D

export const getOffices = async () => {
  let res = await axios.get('/api/firebase/offices')
  return res.data
} //Y

export const getTasks = async () => {
  let res = await axios.get('/api/firebase/tasks')
  return res.data
}// Y


export const addTask = async (task) => {
  if (task.client) createTaskSF(task)
  let res = await axios.post('/api/firebase/tasks', {
    task
  })
  return res.data
} // Y

export const findCoach = async (name) => {
  let res = coachesSingleGET(name)
  return res
} // D

export const findTasksPerCoach = async (name) => {
  let res = await axios.post('/api/firebase/findTasksPerCoach', {
    name
  })
  return res.data
} // Y

export const changeTaskStatus = async (task) => {
  if (task.client) changeTaskStatusSF(task)
  let res = await axios.post('/api/firebase/changeTaskStatus', {
    task
  })
  return res.data
} //Y

export const assignTask = async (task) => {
  if (task.client) reassignTaskSF(task)
  let res = await axios.post('/api/firebase/assignTask', {
    task
  })
  return res.data
} // Y

export const deleteTask = async (task) => {
  let res = await axios.delete('/api/firebase/deleteTask', {
    data: {task}
  })
  return res.data
}// Y

export const fetchLogs = async (id) => {
  let res = await axios.post('/api/firebase/fetchLogs', {id})
  return res.data
} //Y

export const updateTask = async (task) => {
  let res = await axios.post('/api/firebase/updateTask', {
    task
  })
  return res.data
}

export const addNote = async task => {
  let res = await axios.post('/api/firebase/addNote', {
    task
  })
  return res.data
} // Y

export const getNotes = async task => {
  let res = await axios.post('/api/firebase/getNotes', {
    task
  })
  const { notes } = res.data
  return notes
} // Y

export const createNewCoach = async (coach) => {
  let res = coachesNEW(coach)
  return res
} // D

export const createNewOffice = async (office) => {
  let res = await axios.post('/api/firebase/createNewOffice', office)
  return res.data
} // Y

export const editCoach = async (coach) => {
  let res = coachesPUT(coach)
  return res
} // D

