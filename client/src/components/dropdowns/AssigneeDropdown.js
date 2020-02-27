import React, { useState, useEffect } from 'react'
import { Select } from 'react-materialize'

export default function AssigneeDropdown ({ coaches, setSelection, requester }) {
  const [ assignee, setAssignee ] = useState(undefined)
  const [ disabled, setDisabled ] = useState(false)

  useEffect(() => {
    const findAssignee = () => {
      let requesterIsACoach = coaches.some( coach => coach.email.toLowerCase() === requester.toLowerCase())
      if(requesterIsACoach === false) {
        setDisabled(true)
        setAssignee('Sara Troisfontaine')
        setSelection({ assignee: 'Sara Troisfontaine'})
      } else {
        setDisabled(false)
        setAssignee(undefined)
        setSelection({ assignee })
      }
    }
    findAssignee()
  }, [requester, assignee, coaches, setSelection])


  const listCoaches = () => {
    return coaches.map((coach, i) => {
      return <option key={i} value={coach.name}>
        {coach.name}
      </option>
    })
  }

  const handleSelect = e => {
    setAssignee(e.target.value)
    setSelection({ assignee: e.target.value })
  }

  const renderSelection = () => {
    if(requester) return (
      <Select value={assignee} onChange={handleSelect} disabled={disabled}>
        <option disabled value="" defaultValue>
          Assignee
        </option>
        {listCoaches()}
      </Select>
    )
    else return ''
  }

  return renderSelection()
}
