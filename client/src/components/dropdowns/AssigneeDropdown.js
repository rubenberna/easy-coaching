import React, { useState, useEffect } from 'react'
import { Select } from 'react-materialize'

export default function AssigneeDropdown ({ coaches, setSelection, requester }) {
  const [ assignee, setAssignee ] = useState(undefined)
  const [ disabled, setDisabled ] = useState(false)

  useEffect(() => {
    let variant = requester || ''
    const findAssignee = () => {
      let requesterIsACoach = coaches.some( coach => coach.email.toLowerCase() === variant.toLowerCase())
      if(requesterIsACoach === false) {
        setDisabled(true)
        setAssignee('Sara Troisfontaine')
        setSelection({ assignee: 'Sara Troisfontaine'})
      } else {
        setDisabled(false)
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
