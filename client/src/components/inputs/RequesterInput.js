import React, { useState, useEffect, useContext } from 'react'
import { TextInput, RadioGroup } from 'react-materialize'
import styled from 'styled-components'
import { AuthContext } from '../../connectors/auth/Auth'

const StyledFrame = styled.div`

`

const StyledCoachesList = styled.div`
  display: flex;
  margin-left: 13px;
`

const StyledOR = styled.span`
  font-weight: 300;
`

const StyledRadioGroup = styled.div`
  padding-left: 13px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 5px;
  grid-column-gap: 5px;
`

const RequesterInput = ({ handleSelect, requester }) => {
  const [ theRequester, setTheRequester ] = useState('')
  useEffect(() => handleSelect({ requester: theRequester}), [theRequester, handleSelect])

  const { coaches } = useContext(AuthContext)
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
      <StyledCoachesList>
      <StyledOR>OR</StyledOR>
      <StyledRadioGroup>
        <RadioGroup
          value={theRequester}
          withGap
          onChange={handleChange}
          options={coachesList}
        />
      </StyledRadioGroup>
      </StyledCoachesList>
    </StyledFrame>
  )
}

export default RequesterInput;
