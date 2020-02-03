import React, { Component } from 'react'
import { Select } from 'react-materialize'

const statusList = [
  { key: 1, name: 'Not started'},
  { key: 2, name: 'Planned'},
  { key: 3, name: 'Feedback call'},
  { key: 4, name: 'Completed'},
]

class FilterAssigneeDropdown extends Component {

  actionHandler = (e) => {
    let status = e.target.value.toLowerCase()
    this.props.setFilter({ status })
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
