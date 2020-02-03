import axios from 'axios'

export const sendMsg = async (msg) => {
  // console.log(msg);
  const data = new FormData()
  data.append('file', msg.file)
  data.append('filename', msg.file.name)
  data.append('from', msg.from)
  data.append('to', msg.sendTo)
  data.append('title', msg.title)
  data.append('msg', msg.msg)
  data.append('taskDate', msg.taskDate)
  data.append('id', msg.id)

  let res = await axios.post('/api/sendMsg', data)
  return res.data
}
