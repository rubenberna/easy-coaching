import axios from 'axios';
import {
  coachesGET,
  coachesSingleGET,
  coachesNEW,
  coachesPUT
} from './firebase/coaches';
import {
  logsGET,
  logsNEW
} from './firebase/logs'
import {
  officesGET,
  officesNEW
} from './firebase/offices'

import {
  tasksGET,
  tasksNEW,
  tasksPerCoachGET,
  tasksPUT,
  tasksDEL
} from './firebase/tasks'
import { reassignTaskSF, changeTaskStatusSF, createTaskSF } from './sfQueries'


// ------- COACHES -------
export const getCoaches = async () => {
  let res = await coachesGET()
  return res
} 

export const findCoach = async (name) => {
  let res = await coachesSingleGET(name)
  return res
} 

export const createNewCoach = async (coach) => {
  let res = coachesNEW(coach)
  return res
} 

export const editCoach = async (coach) => {
  let res = coachesPUT(coach)
  return res
} 

// ------- OFFICES -------
export const getOffices = async () => {
  let res = await officesGET()
  return res
} 

export const createNewOffice = async (office) => {
  let res = await officesNEW(office)
  return res
}

// ------- TASKS -------
export const getTasks = async () => {
  let res = await tasksGET()
  return res
}

export const addTask = async (task) => {
  if (task.client) createTaskSF(task)
  let res = await tasksNEW(task)
  axios.post('/api/sendEmail/new', { task })
  return res
}

export const findTasksPerCoach = async (name) => {
  let res = await tasksPerCoachGET(name)
  return res
}

export const changeTaskStatus = async (task) => {
  if (task.client) changeTaskStatusSF(task)
  let res = await tasksPUT(task)
  axios.post('/api/sendEmail/changed', { task })
  return res
}

export const assignTask = async (task) => {
  if (task.client) reassignTaskSF(task)
  let res = await tasksPUT(task)
  axios.post('/api/sendEmail/assigned', { task })
  return res.data
}

export const deleteTask = async (task) => {
  let res = await tasksDEL(task)
  return res
}

export const updateTask = async (task) => {
  let res = await tasksPUT(task)
  return res
}

// ------- LOGS -------
export const fetchLogs = async (id) => {
  let res = await logsGET(id)
  return res
}

export const newLog = async (msg) => {
  logsNEW(msg)
}

