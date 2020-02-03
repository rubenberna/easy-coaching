import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Tabs, Tab } from 'react-materialize'
import RadioButtons from '../components/forms/RadioButtons'
import AddMessage from '../components/forms/AddMessage'
import { changeTaskStatus, assignTask, fetchLogs } from '../modules/dbQueries'
import { sendMsg } from '../modules/sendMsg'
import TaskCard from '../components/cards/TaskCard'
import Logs from '../components/tables/Logs'

class TaskView extends Component {
  state = {
    logs: []
  }

  renderAssignSelection = () => {
    const { userLoggedIn } = this.props
    if (userLoggedIn && userLoggedIn.admin) return <RadioButtons assign={this.assignTask} coaches={this.props.coaches}/>
  }

  changeStatus = async (task) => {
    let res = await changeTaskStatus(task)
    if (res === 'success') this.props.history.push('/ongoing')
  }

  viewCoachProfile = (coach) => {
    if (coach) this.props.history.push(`/profile/${coach}`)
  }

  assignTask = async (coach) => {
    const { task } = this.props.location.state
    const taskObj = {
      task,
      assignee: coach
    }
    await assignTask(taskObj)
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
    console.log('task: ', task);
    console.log( 'user: ', userLoggedIn);

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
            <Tab title="Message">
              <AddMessage
                from={ userLoggedIn ? userLoggedIn.email : 'coaching@easylifedc.be' }
                sendTo={ !userLoggedIn ? task.assigneeEmail : (userLoggedIn.email === 'Sara.troisfontaine@easylifedc.be' ? task.assigneeEmail : 'Sara.troisfontaine@easylifedc.be')}
                sendMessage={ this.sendMessage }
                task={ task }
                fetchLogs={this.fetchLogs}
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
