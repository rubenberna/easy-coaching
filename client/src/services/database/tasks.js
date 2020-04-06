import { tasks } from '../../config/firebaseConfig'
import { coachesSingleGET } from './coaches'

export const tasksGET = async () => {
  const snapshot = await tasks.get()
  const records = snapshot.docs.map(doc => {
    let task = doc.data()
    task.id = doc.id
    return task
  })
  return records
}

export const tasksNEW = async (task) => {
  const [assignee] = await coachesSingleGET(task.assignee)
  task.assigneeEmail = assignee.email
  task.calendarColor = assignee.calendarColor
  task.houseKeeper = task.houseKeeper || ''
  task.client = task.client || ''
  console.log(task);
  
  tasks.add({ ...task })
  return  `Task ${task.title} saved`
}

export const tasksPerCoachGET = async (name) => {
  const snapshot = await tasks.where('assignee', '==', name).get()
  const records = snapshot.docs.map(doc => {
    let task = doc.data()
    task.id = doc.id
    return task
  })
  return records
}

export const tasksDEL = async (task) => {
  tasks.doc(task.id).delete()
  return 'Deleted'
}

export const tasksPUT = async (task) => {
  let taskRef = tasks.doc(task.id)  
  taskRef.update({
    assignee: task.assignee,
    assigneeEmail: task.assigneeEmail,
    start: task.start, 
    end: task.end,
    status: task.status,
    cxlReason: task.cxlReason || '',
    notes: task.notes || []
  })
}