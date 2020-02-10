import axios from 'axios';

export const getClient = async id => {
  const client = await axios.post('/api/querySF/get_client', {id})
  return client.data
}
