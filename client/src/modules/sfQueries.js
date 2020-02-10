import axios from 'axios';

export const getUser = async id => {
  const client = await axios.post('/api/querySF/get_user', {id})
  return client.data
}
