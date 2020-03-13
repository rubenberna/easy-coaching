import axios from 'axios'

export const getDelightedData = async () => {
  const res = await axios.get('/api/delighted')
  return res.data
}

export const getDelightedTrend = async () => {
  const res = await axios.get('/api/delighted/trend')
  return res.data
}
