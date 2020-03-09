import React, { Component } from 'react'
import { Select } from 'react-materialize'

class StatusDropdown extends Component {

  actionHandler = (e) => {
    let assignee = e.target.value
    this.props.setFilter({ assignee: assignee === 'All' ? undefined : assignee })
  }

  listAssignees = () => {
    const { coaches } = this.props
    const allValue = { key: 0, name: 'All'}
    let withAll = [...coaches, allValue].sort((a, b) => (a.name > b.name) ? 1 : -1)
    return withAll.map((coach, i) => {
      return <option key={i} value={coach.name}>
        {coach.name}
      </option>
    })
  }

  render () {
    return(
      <div className="filter-dropdown">
        <label className='filter-label'>Assignee</label>
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
