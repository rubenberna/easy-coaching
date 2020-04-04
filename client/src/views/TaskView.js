import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Tabs, Tab } from 'react-materialize'
import { AuthContext } from '../connectors/auth/Auth'
import RadioButtons from '../components/forms/RadioButtons'
import AddMessage from '../components/forms/AddMessage'
import { changeTaskStatus, assignTask, fetchLogs } from '../services/dbQueries'
import { sendMsg } from '../services/sendMsg'
import TaskCard from '../components/cards/TaskCard'
import Logs from '../components/tables/Logs'
import ContactsCard from '../components/cards/ContactsCard'
import NotesCard from '../components/cards/NotesCard'

class TaskView extends Component {
  state = {
    logs: [],
  }

  static contextType = AuthContext

  renderAssignSelection = () => {
    const { userProfile } = this.context
    if (userProfile && userProfile.admin) return (
      <RadioButtons assign={this.assignTask} />
    )
  }

  changeStatus = async (task) => {
    let res = await changeTaskStatus(task)
    if (res === 'success') this.props.history.push('/ongoing')
  }

  viewCoachProfile = (coach) => {
    if (coach) this.props.history.push(`/profile/${coach}`)
  }

  assignTask = async (coachName) => {
    const { task } = this.props.location.state
    const coach = this.context.coaches.find(coach => coach.name === coachName)
    task.assignee = coach.name
    task.assigneeEmail = coach.email
    await assignTask(task)
    this.props.history.push('/ongoing')
  }

  sendMessage = (msg) => {
    sendMsg(msg)
  }

  fetchLogs = async () => {
    const { task } = this.props.location.state
    const logs = await fetchLogs(task.id)
    this.setState({logs: logs})
  }

  componentDidMount() {
    this.fetchLogs()
  }

  render() {
    const { task } = this.props.location.state
    const { userLoggedIn } = this.props
    const { userProfile } = this.context

    return(
      <>
        <div className='task-view container'>
          <Tabs className="tab-demo z-depth-1">
            <Tab title="Details">
              <TaskCard
                task={task}
                viewCoachProfile={this.viewCoachProfile}
                userLoggedIn={userLoggedIn}
                changeStatus={this.changeStatus}
              />
            </Tab>
            <Tab title="Contacts">
              <ContactsCard task={task}/>
            </Tab>
            <Tab title="Message">
              <AddMessage
                from={userProfile.email }
                sendTo={userProfile.type === 'office' ? task.assigneeEmail : (task.requester === userProfile.email ? task.assigneeEmail : task.requester)}
                sendMessage={ this.sendMessage }
                task={ task }
                fetchLogs={this.fetchLogs}
              />
            </Tab>
            <Tab title="Notes">
              <NotesCard
                task={task}
              />
            </Tab>
            <Tab title="Logs">
              <Logs logs={this.state.logs}/>
            </Tab>
          </Tabs>
        </div>
        { this.renderAssignSelection() }
      </>
    )
  }
}

export default withRouter(TaskView);


// sendTo = { !userLoggedIn ? task.assigneeEmail : (task.requester === userLoggedIn.email ? task.assigneeEmail : task.requester)}