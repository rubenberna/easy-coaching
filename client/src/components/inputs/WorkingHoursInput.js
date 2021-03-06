import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../connectors/auth/Auth'
import styled from 'styled-components'
import { TextInput } from 'react-materialize'

import { useFormInput } from '../../services/hooks'
import WeekdaysCheckbox from './WeekdaysCheckbox'

const StyledFrame = styled.div`
  background: #f5f5f5;
  border-radius: 25px;
  width: 100%;
`

const StyledInnerFrame = styled.div`
  padding: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledInputGroup = styled.div`
  display: flex;
  justify-content: space-around;
  width: 200px;
`

const StyledInput = styled(TextInput)`
  width: 80px !important;
`

const StyledHeader = styled.span`
  margin: 0 auto;
  text-align: center;
  color: #009688;
`

const StyledNote = styled.span`
  margin: 0 auto;
  text-align: center;
  font-size: 11px;
  font-weight: 200;
`

const WorkingHoursInput = ({ requester, handleSelect, houseKeeper }) => {
  const from = useFormInput("")
  const until = useFormInput("")
  const [ requesterIsCoach, setRequesterIsCoach ] = useState(true)
  const { coaches } = useContext(AuthContext)

  useEffect(() => {
    const checkIfRequesterIsCoach = () => {
      let variant = requester || ''
      let requesterIsACoach = coaches.some( coach => coach.email.toLowerCase() === variant.toLowerCase())
      if (requesterIsACoach) setRequesterIsCoach(true)
      else setRequesterIsCoach(false)
    }
    checkIfRequesterIsCoach()
  }, [requester, coaches])

  useEffect(() => {
    function updateNewTask() {
      handleSelect({ hkFrom: from.value})
      handleSelect({ hkUntil: until.value})
    }
    updateNewTask()
  },[from.value, until.value, handleSelect])


  const conditionalRender = () => {
    if (requesterIsCoach || houseKeeper === undefined) return ''
    else return (
      <StyledFrame>
        <StyledInnerFrame>
          <StyledHeader>Please enter the House Keeper working hours</StyledHeader>
          <StyledInputGroup>
            <StyledInput placeholder='08:00' {...from } />
            <StyledInput placeholder='17:00' {...until}/>
          </StyledInputGroup>
          <StyledNote>Office hours are 8am to 5pm</StyledNote>
        </StyledInnerFrame>
        <WeekdaysCheckbox handleSelect={handleSelect} />
      </StyledFrame>
    )
  }

  return conditionalRender()
}

export default WorkingHoursInput;
