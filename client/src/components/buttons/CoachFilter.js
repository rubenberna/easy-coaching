import React, { useState, useEffect } from 'react'
import { RadioGroup } from 'react-materialize'
import styled from 'styled-components'

const ButtonsList = styled.div`
  display: flex;
  flex-direction: column;
`

const Header = styled.h4`
  margin-bottom: 15px;
`

const CoachFilter = ({coaches, filterCoach}) => {
  const [coach, setCoach] = useState('')
  useEffect(() => {
    filterCoach(coach)
  }, [coach, filterCoach])

  const coachesList = coaches.map(({name}) => ({label: name, value: name}))
  const fullList = [{label: 'All', value: ''}, ...coachesList]
  return(
    <ButtonsList>
      <Header>Coach filter</Header>
      <RadioGroup
        value={coach}
        withGap
        onChange={e => setCoach(e.target.value)}
        options={fullList}
      />
    </ButtonsList>
  )
}

export default CoachFilter;
