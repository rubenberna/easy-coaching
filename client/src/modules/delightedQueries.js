import axios from 'axios'

export const getDelightedData = async () => {
  const res = await axios.get('/api/delighted')
  return res.data
}
