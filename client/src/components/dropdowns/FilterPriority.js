import React, { Component } from 'react'
import { Select } from 'react-materialize'

const priorityList = [
  { key: 0, value: undefined, name: 'All' },
  { key: 1, value: 'low', name: 'Low' },
  { key: 2, value: 'moderate', name: 'Moderate' },
  { key: 3, value: 'urgent', name: 'Urgent' }
]

class FilterPriority extends Component {

  actionHandler = (e) => {
    let inputedValue = e.target.value
    this.props.setFilter({ priority: inputedValue === 'All' ? undefined : inputedValue})
  }

  listPriority = () => {
    return priorityList.map(priority => {
      return <option key={priority.key} value={priority.value}>
        {priority.name}
      </option>
    })
  }

  render() {
    let { priority } = this.props
    return (
      <div className="filter-dropdown">
        <label className='filter-label'>Priority</label>
        <Select onChange={this.actionHandler}>
          <option disabled value={priority} defaultValue>
            Status Filter
          </option>
          {this.listPriority()}
        </Select>
      </div>
    )
  }
}

export default FilterPriority
