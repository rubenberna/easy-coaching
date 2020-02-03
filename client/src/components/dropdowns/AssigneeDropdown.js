import React, { Component } from 'react'
import { Select } from 'react-materialize'


class AssigneeDropdown extends Component {
  state = { assignee: ''}

  actionHandler = (e) => {
    this.setState({ assignee: e.target.value })
    this.props.setSelection({ assignee: e.target.value })
  }

  listCoaches = () => {
    const { coaches } = this.props
    return coaches.map((coach, i) => {
      return <option key={i} value={coach.name}>
        {coach.name}
      </option>
    })
  }

  render () {
    let {assignee} = this.state

    return(
      <>
        <Select value={assignee} onChange={this.actionHandler} >
          <option disabled value="" defaultValue>
            Assignee
          </option>
          {this.listCoaches()}
        </Select>
      </>
    )
  }
}

export default AssigneeDropdown;
