import React, { Component } from 'react'
import { Select } from 'react-materialize'

const priorityList = [
  { key: 1, name: 'Low'},
  { key: 2, name: 'Moderate'},
  { key: 3, name: 'Urgent'}
]

class PriorityDropdown extends Component {
  state = { priority: ''}

  actionHandler = (e) => {
    const priority = e.target.value.toLocaleLowerCase()
    this.setState({ priority })
    this.props.setSelection({ priority })
  }

  listPriority = () => {
    return priorityList.map(priority => {
      return <option key={priority.key} value={priority.name}>
        {priority.name}
      </option>
    })
  }

  render () {

    return(
      <div className={this.props.namedClass}>
        <Select onChange={this.actionHandler}>
          <option disabled value="" defaultValue>
            Set priority
          </option>
          {this.listPriority()}
        </Select>
      </div>
    )
  }
}

export default PriorityDropdown;
