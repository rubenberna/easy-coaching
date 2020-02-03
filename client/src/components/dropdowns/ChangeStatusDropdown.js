import React, { Component } from 'react'
import { Select } from 'react-materialize'

class Name extends Component {
  state = { status: ''}

  actionHandler = (e) => {
    this.setState({ status: e.target.value })
    const { task, changeStatus } = this.props
    task.status = e.target.value
    changeStatus(task)
  }

  render() {
    let {status} = this.state
    // console.log(this.props);
    return(
      <div className='change-status-dropdown'>
        <Select value={status} onChange={this.actionHandler} >
          <option value="" disabled defaultValue>
            Change status
          </option>
          <option value="not started">
            Not started
          </option>
          <option value="planned">
            Planned
          </option>
          <option value="feedback call">
            Feedback call
          </option>
          <option value="completed">
            Completed
          </option>
        </Select>
      </div>
    )
  }
}

export default Name;
