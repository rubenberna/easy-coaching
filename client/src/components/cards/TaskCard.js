import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import moment from 'moment'

import { TasksContext } from '../../connectors/tasks'
import { deleteTask, changeTaskStatus } from '../../services/dbQueries'
import ChangeStatus from '../dropdowns/ChangeStatusDropdown'
import DeleteModal from '../modal/DeleteModal'

class TaskCard extends Component {
  
  static contextType = TasksContext
  renderChangeStatus = () => {
    const { task, userProfile } = this.props
    if (userProfile) {
      if (userProfile.name === task.assignee || userProfile.admin) return (
        <ChangeStatus task={task} changeStatus={this.changeStatus}/>
        )
      }
    }
    
  renderCancellationReason = () => {
    const { task } = this.props
    if(task.cxlReason) return (
      <h6>
        <span className='task-spec'>Cancellation reason: </span><
        span>{task.cxlReason}</span>
      </h6>
    )
  }

  handleDelete = async () => {
    const { task, history } = this.props
    await deleteTask(task)
    this.props.fetchTasks()
    history.push('/ongoing')
  }

  changeStatus = async (task) => {
    await changeTaskStatus(task)
    this.props.fetchTasks()
    this.props.history.push('/ongoing')
  }

  renderDelete = () => {
    const { userProfile } = this.props
    if(userProfile) {
      if (userProfile.admin) return (
        <DeleteModal handleDelete={this.handleDelete}/>
      )
    }
  }

  render() {
    const { task } = this.props
    return(
      <div>
        <h4>{task.title}</h4>
        <hr/>
        <div className='task-card'>
          <div className='task-details'>
            <h6><span className='task-spec'>Description: </span>{task.description === 'error' ? 'none' : task.description}</h6>
            <h6><span className='task-spec'>Requested by: </span>{ task.requester }</h6>
            <h6 style={{ cursor: 'pointer' }}
              onClick={ e => this.props.history.push(`/profile/${task.assignee}`)}>
              <span className='task-spec'>Assigned to: </span>
              { task.assignee }
            </h6>
            { this.renderCancellationReason() }
          </div>

            <div className='task-details shorter'>
            <h6><span className='task-spec'>Priority: </span><span style={{ textTransform: 'capitalize'}} className={task.priority}>{task.priority}</span></h6>
            <h6><span className='task-spec'>Date requested: </span>{moment(task.reqDate).format("MMM Do")}</h6>
              <h6><span className='task-spec'>Start: </span>{moment(task.start).format('Do MMMM, h:mm a')}</h6>
              <h6><span className='task-spec'>End: </span>{moment(task.end).format('Do MMMM, h:mm a')}</h6>
            { task.client &&
              <h6><span className='task-spec'>Office: </span>
                <a href={`https://maps.google.com/?q=${task.client.Account.BillingAddress.street}, ${task.client.Account.BillingAddress.city}`} target="_blank" rel="noopener noreferrer">{task.client.Account.Name}</a>
              </h6>
            }
            <h6><span className='task-spec'>Reason: </span><span style={{ textTransform: 'capitalize'}}>{task.type}</span></h6>
            <h6><span className='task-spec'>Status: </span><span className={task.status}>{task.status}</span></h6>
            { this.renderDelete() }
          </div>

        </div>
        { this.renderChangeStatus() }
      </div>
    )
  }
}

export default withRouter(TaskCard);
