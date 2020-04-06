import { logs } from '../../config/firebaseConfig'

export const logsGET = async (id) => {
  const snapshot = await logs.where('taskId', '==', id).get()
  const records = snapshot.docs.map(doc => doc.data())
  return records
}

export const logsNEW = (data) => {
  let log = {
    sentDate: Date.now(),
    from: data.from,
    taskId: data.id
  }
  logs.add({ ...log })
}