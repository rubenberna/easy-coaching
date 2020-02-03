import React, { Component } from 'react'
import { getTasks } from '../modules/dbQueries'

import './views.scss'
import TableTasks from '../components/tables/Table'

class OngoingProjects extends Component {
  state = {
    tasks: []
  }

  async componentDidMount() {
    const tasks = await getTasks()
    this.setState({ tasks })
  }

  render() {
    return(
      <div className='container ongoing-projects'>
        <h2>Ongoing Projects</h2>
        <TableTasks list={this.state.tasks} coaches={this.props.coaches} />
      </div>
    )
  }
}

export default OngoingProjects;
