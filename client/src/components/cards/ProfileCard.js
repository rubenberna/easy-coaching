import React from 'react'

import ImageCard from './ImageCard'
import DetailsCard from './DetailsCard'
import TableCompleted from '../tables/TableCompleted'

const ProfileCard = (props) => {
  return(
    <div className='profile-card'>
      <div className='profile-card-frame'>
        <ImageCard coach={props.profile} bigger={true}/>
        <DetailsCard coach={props.profile} tasks={props.taskList}/>
      </div>
      <TableCompleted tasks={props.taskList} />
    </div>
  )
}

export default ProfileCard;
