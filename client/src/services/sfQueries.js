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

export const getAllAccounts = async () => {
  const accounts = await axios.get('/api/querySF/all_accounts')
  const list = accounts.data.map(a => a.Name)
  const uniqList = [...new Set(list)].sort()
  return uniqList
}
