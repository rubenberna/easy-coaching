import React, { useContext, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Tabs, Tab } from 'react-materialize'

import { AuthContext } from '../connectors/auth/Auth'
import { TasksContext } from '../connectors/tasks'
import RadioButtons from '../components/forms/RadioButtons'
import AddMessage from '../components/forms/AddMessage'
import { assignTask, fetchLogs, newLog, getTasks } from '../services/dbQueries'
import { sendMsg } from '../services/sendMsg'
import TaskCard from '../components/cards/TaskCard'
import Logs from '../components/tables/Logs'
import ContactsCard from '../components/cards/ContactsCard'
import NotesCard from '../components/cards/NotesCard'

const TaskView = ({ history, location }) => {
  const [logs, setLogs] = useState([])
  const { userProfile, coaches } = useContext(AuthContext)
  const { dispatch } = useContext(TasksContext)
  const { task } = location.state

  const getLogs = async () => {
    console.log('getting');
    const logs = await fetchLogs(task.id)
    setLogs(logs)
  }

  useEffect(() => {
    getLogs()
  }, [])

  const fetchTasks = async () => {
    const tasks = await getTasks()
    dispatch({ 
      type: 'SET_TASKS', 
      payload: tasks 
    })
  }

  const renderAssignSelection = () => {
    if (userProfile && userProfile.admin) return (
      <RadioButtons assign={giveTask} />
    )
  }

  const viewCoachProfile = (coach) => {
    if (coach) history.push(`/profile/${coach}`)
  }

  const giveTask = async (coachName) => {
    const coach = coaches.find(coach => coach.name === coachName)
    task.assignee = coach.name
    task.assigneeEmail = coach.email
    await assignTask(task)
    fetchTasks()
    history.push('/ongoing')
  }

  const sendMessage = (msg) => {
    sendMsg(msg)
    newLog(msg)
  }

  const renderMessageTab = () => {
    if (userProfile) return (
      <AddMessage
        from={userProfile.email}
        sendTo={userProfile.type === 'office' ? task.assigneeEmail : (task.requester === userProfile.email ? task.assigneeEmail : task.requester)}
        sendMessage={sendMessage}
        task={task}
        fetchLogs={fetchLogs}
      />
    )
  }

  return(
    <>
      <div className='task-view container'>
        <Tabs className="tab-demo z-depth-1">
          <Tab title="Details">
            <TaskCard
              task={task}
              userProfile={userProfile}
              viewCoachProfile={viewCoachProfile}
              fetchTasks={fetchTasks}
            />
          </Tab>
          <Tab title="Contacts">
            <ContactsCard task={task}/>
          </Tab>
          <Tab title="Message">
            { renderMessageTab() }
          </Tab>
          <Tab title="Notes">
            <NotesCard
              task={task}
              fetchTasks={fetchTasks}
            />
          </Tab>
          <Tab title="Logs">
            <Logs logs={logs}/>
          </Tab>
        </Tabs>
      </div>
      { renderAssignSelection() }
    </>
  )
}

export default withRouter(TaskView);