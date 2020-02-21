import React, { Component } from 'react'
import moment from 'moment'
import ChangeStatus from '../dropdowns/ChangeStatusDropdown'

class TaskCard extends Component {

  renderChangeStatus = () => {
    const { userLoggedIn, task, changeStatus } = this.props
    if (userLoggedIn && userLoggedIn.name === task.assignee) return <ChangeStatus task={task} changeStatus={changeStatus}/>
  }

  render() {
    const { task } = this.props
    return(
      <div>
        <h4>{task.title}</h4>
        <hr/>
        <div className='task-details'>
          <h6><span className='task-spec'>Assigned to: </span>
            { task.assignee }
          </h6>
          <h6><span className='task-spec'>Priority: </span>
            { task.priority }
          </h6>
          <h6><span className='task-spec'>Date requested: </span>{moment(task.reqDate).format("MMM Do")}</h6>
          <h6><span className='task-spec'>Start: </span>{moment(task.start).format('Do MMMM, h:mm a')}</h6>
          <h6><span className='task-spec'>End: </span>{moment(task.end).format('Do MMMM, h:mm a')}</h6>
          <h6><span className='task-spec'>Description: </span>{task.description}</h6>
          { task.client &&
            <h6><span className='task-spec'>Office: </span>
              <a href={`https://maps.google.com/?q=${task.client.Account.BillingAddress.street}, ${task.client.Account.BillingAddress.city}`} target="_blank" rel="noopener noreferrer">{task.client.Account.Name}</a>
            </h6>
          }
          <h6><span className='task-spec'>Reason: </span><span style={{ textTransform: 'capitalize'}}>{task.type}</span></h6>
          <h6><span className='task-spec'>Status: </span><span className={task.status}>{task.status}</span></h6>
          {this.renderChangeStatus()}
        </div>
      </div>
    )
  }
}

export default TaskCard;
