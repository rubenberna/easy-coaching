import React, { Component } from 'react'
import TaskChip from '../chips/Chip'

const calendarColorFrame = {
  width: '15px',
  color: 'transparent',
  borderRadius: '50%',
  marginLeft: '3px'
}

class DetailsCard extends Component {

  render () {
    const { coach, tasks } = this.props

    return(
      <div className='details-card'>
        <h6><span className='details-card-spec'>Name: </span>{coach.name}</h6>
        <h6><span className='details-card-spec'>Started on: </span>{coach.started}</h6>
        <h6><span className='details-card-spec'>Role: </span>{coach.role}</h6>
        <h6><span className='details-card-spec'>Introduction: </span>{coach.intro}</h6>
        <h6><span className='details-card-spec'>Calendar color: </span>
          <span style={{...calendarColorFrame, ...{backgroundColor: coach.calendarColor}}}>he</span>
        </h6>
        <h6><span className='details-card-spec'>Ongoing Visits:</span></h6>
        <TaskChip taskList={tasks}/>
      </div>
    )
  }
}

export default DetailsCard;
