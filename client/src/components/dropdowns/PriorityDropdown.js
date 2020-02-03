import React, { Component } from 'react'
import { Select } from 'react-materialize'

const priorityList = [
  { key: 1, name: 'This month'},
  { key: 2, name: 'This week'},
  { key: 3, name: 'Today'},
  { key: 4, name: 'Stop everything else'},
]

class PriorityDropdown extends Component {
  state = { priority: ''}

  actionHandler = (e) => {
    const priority = e.target.value   
    this.setState({ priority })
    this.props.setSelection({ priority })
  }

  listPriority = () => {
    return priorityList.map(priority => {
      return <option key={priority.key} value={priority.key}>
        {priority.name}
      </option>
    })
  }

  render () {    
    let {priority} = this.state
    
    return(
      <>
        <Select value={priority} onChange={this.actionHandler}>
          <option disabled value="" defaultValue>
            Set priority
          </option>
          {this.listPriority()}
        </Select>
      </>
    )
  }
}

export default PriorityDropdown;
