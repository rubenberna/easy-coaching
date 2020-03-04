import React, { Component } from 'react'
import { getTasks } from '../modules/dbQueries'

import './views.scss'
import TableTasks from '../components/tables/Table'

class OngoingProjects extends Component {
  state = {
    tasks: [],
    filteredAssignee: undefined,
    filteredStatus: undefined
  }

  async componentDidMount() {
    const tasks = await getTasks()
    this.setState({ tasks })
  }

  changeTaskList = filters => {

  }

  setFilter = filter => {
    console.log(filter);
    this.setState({...filter})
    this.changeTaskList()
  }

  render() {
    return(
      <div className='ongoing-projects'>
        <h2>Ongoing Visits</h2>
        <TableTasks
          list={this.state.tasks}
          coaches={this.props.coaches}
          changeTaskList={this.changeTaskList}
          setFilter={this.setFilter}
          />
      </div>
    )
  }
}

export default OngoingProjects;
