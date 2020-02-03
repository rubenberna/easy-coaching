import React, { Component } from 'react'
import TaskChip from '../chips/Chip'

class DetailsCard extends Component {

  state = {

  }

  render () {
    const { coach, tasks } = this.props
    
    return(
      <div className='details-card'>
        <h6><span className='details-card-spec'>Name: </span>{coach.name}</h6>
        <h6><span className='details-card-spec'>Started on: </span>{coach.started}</h6>
        <h6><span className='details-card-spec'>Role: </span>{coach.role}</h6>
        <h6><span className='details-card-spec'>Introduction: </span>{coach.intro}</h6>
        <h6><span className='details-card-spec'>Ongoing Projects:</span></h6>
        <TaskChip taskList={tasks}/>
      </div>
    )
  }
}

export default DetailsCard;
