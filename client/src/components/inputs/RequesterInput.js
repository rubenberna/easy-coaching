import React, { useState, useEffect } from 'react'
import { TextInput, RadioGroup } from 'react-materialize'
import styled from 'styled-components'

const StyledFrame = styled.div`

`

const StyledOR = styled.span`
  font-weight: 300;
`

const StyledRadioGroup = styled.div`
  padding-left: 13px;
  display: grid;
  grid-auto-columns: auto;
  grid-row-gap: 5px;
  grid-column-gap: 5px;
`

const RequesterInput = ({ coaches, handleSelect, requester }) => {

  const [ theRequester, setTheRequester ] = useState('')
  useEffect(() => handleSelect({ requester: theRequester}), [theRequester, handleSelect])

  const coachesList = coaches.map(coach => ({label: coach.name.split(' ')[0], value: coach.email}))

  const handleChange = (e) => {
    setTheRequester(e.target.value)
  }

  return(
    <StyledFrame>
      <TextInput
        value={theRequester}
        label='New requester'
        type='email'
        placeholder='me@easylifedc.be'
        onChange={handleChange}/>
      <StyledRadioGroup>
        <StyledOR>OR</StyledOR>
        <RadioGroup
          value={theRequester}
          withGap
          onChange={handleChange}
          options={coachesList}
        />
      </StyledRadioGroup>
    </StyledFrame>
  )
}

export default RequesterInput;
