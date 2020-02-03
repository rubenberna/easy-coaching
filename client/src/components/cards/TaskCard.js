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
          <h6><span className='task-spec'>Date requested: </span>{moment(task.reqDate).format("MMM Do")}</h6>
          <h6><span className='task-spec'>Description: </span>{task.description}</h6>
          <h6><span className='task-spec'>Type: </span>{task.type}</h6>
          <h6><span className='task-spec'>Status: </span><span className={task.status}>{task.status}</span></h6>
          {this.renderChangeStatus()}
        </div>
      </div>
    )
  }
}

export default TaskCard;
