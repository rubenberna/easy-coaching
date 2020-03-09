import React, { Component } from 'react'
import { Select } from 'react-materialize'

const statusList = [
  { key: 0, name: 'All'},
  { key: 1, name: 'Not started'},
  { key: 2, name: 'Planned'},
  { key: 3, name: 'Feedback call'},
  { key: 4, name: 'Completed'},
  { key: 5, name: 'Cancelled'},
]

class FilterAssigneeDropdown extends Component {

  actionHandler = (e) => {
    let status = e.target.value.toLowerCase()
    this.props.setFilter({ status: status === 'all' ? undefined : status })
  }

  listStatus = () => {
    return statusList.map(status => {
      return <option key={status.key} value={status.name}>
        {status.name}
      </option>
    })
  }

  render () {
    return(
      <div className="filter-dropdown">
        <label className='filter-label'>Status</label>
        <Select onChange={this.actionHandler}>
          <option disabled value="" defaultValue>
            Status Filter
          </option>
          {this.listStatus()}
        </Select>
      </div>
    )
  }
}

export default FilterAssigneeDropdown;
