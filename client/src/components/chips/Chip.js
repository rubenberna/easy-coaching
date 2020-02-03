import React from 'react'
import { withRouter } from 'react-router-dom'
import { Chip } from 'react-materialize'

const TaskChip = (props) => {

  const viewTaskDetails = (task) => {
    props.history.push({
      pathname: `/task/${task.title}`,
      state: { task }
    })
  }

  const renderTasks = () => {
    const { taskList } = props
    console.log(taskList);
    
    let incompleteTasks = taskList.filter(task => task.status !== 'complete')
    if(!incompleteTasks.length) return <h6>None for the moment...</h6>
    else return (
      incompleteTasks.map((task, i) => <Chip key={i} style={{ cursor: 'pointer' }} onClick={ e => viewTaskDetails(task) }>{task.title}</Chip>)
    )
  }

  return(
    <div>
      { renderTasks() }
    </div>
  )
}

export default withRouter(TaskChip);
