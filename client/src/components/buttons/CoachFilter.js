import React, { useState, useEffect, useContext } from 'react'
import { RadioGroup } from 'react-materialize'
import { AuthContext } from '../../connectors/auth/Auth'
import styled from 'styled-components'

const ButtonsList = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 992px) {
    margin-top: 30px;
    align-self: baseline;
  }
`

const Header = styled.h4`
  margin-bottom: 15px;
`

const CoachFilter = ({filterCoach}) => {
  const [coach, setCoach] = useState('')
  const { coaches } = useContext(AuthContext)

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
