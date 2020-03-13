import React, { useContext } from 'react'
import { Select } from 'react-materialize'
import { AuthContext } from '../../auth/Auth'

const StatusDropdown =  (props) => {
  const { coaches } = useContext(AuthContext)

  const actionHandler = (e) => {
    let assignee = e.target.value
    props.setFilter({ assignee: assignee === 'All' ? undefined : assignee })
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
        <Select onChange={actionHandler} value={props.assignee}>
          <option disabled value="" defaultValue>
            Coaches Filter
          </option>
          {listAssignees()}
        </Select>
      </div>
    )
}

export default StatusDropdown;
