import axios from 'axios'

export const pokeDev = async (task) => {
  let res = await axios.post('/api/poke', {
    task
  })
  return res.data
}
