import React, { Component } from 'react'
import { RadioGroup } from 'react-materialize'

const priorityList = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
]

class FilterPriority extends Component {

  actionHandler = (e) => { 
    this.props.setPriority({ priority: e.target.value})
  }

  listPriority = () => {
    return priorityList.map(priority => {
      return <option key={priority.label} value={priority.label}>
        {priority.label}
      </option>
    })
  }

  render() {
    let { priority } = this.props
    return (
      <div className='filter-priority'>
        <span>Priorities Filter</span>
        <RadioGroup 
          value={priority} 
          withGap 
          onChange={this.actionHandler} 
          options={priorityList}
        />
      </div>
    )
  }
}

export default FilterPriority