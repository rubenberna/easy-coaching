import React, { Component } from 'react'
import { Select } from 'react-materialize'

class StatusDropdown extends Component {

  actionHandler = (e) => {
    let assignee = e.target.value
    this.props.setFilter({ assignee })
  }

  listAssignees = () => {
    const { coaches } = this.props
    return coaches.map((coach, i) => {
      return <option key={i} value={coach.name}>
        {coach.name}
      </option>
    })
  }

  render () {
    return(
      <div className="filter-dropdown">
        <Select onChange={this.actionHandler} value={this.props.assignee}>
          <option disabled value="" defaultValue>
            Coaches Filter
          </option>
          {this.listAssignees()}
        </Select>
      </div>
    )
  }
}

export default StatusDropdown;
