import React, { useState, useEffect } from 'react'
import { TextInput, RadioGroup } from 'react-materialize'
import styled from 'styled-components'

const StyledFrame = styled.div`

`

const StyledOR = styled.span`
  font-weight: 300;
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
        label='Requester'
        type='email'
        placeholder='me@easylifedc.be'
        onChange={handleChange}/>
      <StyledOR>OR</StyledOR>
      <RadioGroup
        value={theRequester}
        withGap
        onChange={handleChange}
        options={coachesList}
      />
    </StyledFrame>
  )
}

export default RequesterInput;
