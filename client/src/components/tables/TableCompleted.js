import React, { Component } from 'react'
import moment from 'moment'
import { Table, Button } from "react-materialize"

class TableCompleted extends Component {

  state = {
    showComplete: false
  }

  renderTable = () => {
    let tasksCompleted = []
    const { tasks } = this.props
    if(tasks.length) {
      tasksCompleted = tasks.filter(task => {
        return task.status === 'complete'
      })
      if (tasksCompleted.length) return (
        <Table className='highlight'>
          <thead>
            <tr>
              <th data-field="title">Title</th>
              <th data-field="requester">By who</th>
              <th data-field="date">Requested</th>
              <th data-field="status">Status</th>
            </tr>
          </thead>
          { this.renderTaskBody(tasksCompleted) }
        </Table>
      )
      else return 'No tasks completed yet'
    }
  }

  renderTaskBody = (tasksCompleted) => {
    return tasksCompleted.map((task, index) => {
      return (
        <tbody key={index} style={{ cursor: 'pointer' }}>
          <tr>
            <td>
              { task.title }
            </td>
            <td>
                { task.requester }
            </td>
            <td>
              { moment(task.reqDate).format("MMM Do")  || '' }
            </td>
            <td className='complete'>
              { task.status }
            </td>
          </tr>
        </tbody>
      )}
    )
  }

  switchComplete = () => {
    this.setState({ showComplete: !this.state.showComplete })
  }

  render () {
    const { showComplete } = this.state
    return(
      <div className='table-completed'>
        <Button onClick={ e => this.switchComplete() }>{showComplete ? 'Hide Completed' : 'Show Completed'}</Button>
        { showComplete && this.renderTable() }
      </div>
    )
  }
}

export default TableCompleted;
