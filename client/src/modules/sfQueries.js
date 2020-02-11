import axios from 'axios';

export const getUser = async id => {
  const client = await axios.post('/api/querySF/get_user', {id})
  return client.data
}

export const createTaskSF = async task => {
  const res = await axios.post('/api/querySF/created_task', {task})
  return res.data
}

export const reassignTaskSF = async task => {
  const res = await axios.post('/api/querySF/reassign', {task})
  return res.data
}

export const changeTaskStatusSF = async task => {
  const res = await axios.post('/api/querySF/change_status', {task})
  return res.data
}
