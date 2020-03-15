import React, { useContext } from 'react'
import { Select } from 'react-materialize'
import { AuthContext } from '../../connectors/auth/Auth'

const StatusDropdown =  ({setAssignee}) => {
  const { coaches } = useContext(AuthContext)

  const actionHandler = (e) => {
    let inputValue = e.target.value
    let assignee = inputValue === 'All' ? undefined : inputValue
    setAssignee(assignee)
  }

  const listAssignees = () => {
    const allValue = { key: 0, name: 'All'}
    let withAll = [...coaches, allValue].sort((a, b) => (a.name > b.name) ? 1 : -1)
    return withAll.map((coach, i) => {
      return <option key={i} value={coach.name}>
        {coach.name}
      </option>
    })
  }

    return(
      <div className="filter-dropdown">
        <label className='filter-label'>Assignee</label>
        <Select onChange={actionHandler} value={{setAssignee}.assignee}>
          <option disabled value="" defaultValue>
            Coaches Filter
          </option>
          {listAssignees()}
        </Select>
      </div>
    )
}

export default StatusDropdown;
