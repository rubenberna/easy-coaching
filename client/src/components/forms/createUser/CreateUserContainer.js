import React, { useState } from 'react'
import { Button, Icon } from 'react-materialize'
import styled from 'styled-components'
import NewCoach from './NewCoach'

const StyledContainer = styled.div`
  width: 700px;
`

const StyledFrame = styled.div`
  width: 385px;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 50px;
`

const StyledBtn = styled(Button)`
  background: #e0e0e0;
`

const CreateUserContainer = (props) => {
  const [userType, setUserType] = useState('')

  const renderForm = () => {
    if(userType === 'coach') return <NewCoach getCoaches={props.getCoaches}/>
    if(userType === 'office') return <h1>New Office</h1>
  }

  return(
    <StyledContainer>
      <StyledFrame>
        <StyledBtn onClick={e => setUserType('coach')}>New Coach<Icon left>face</Icon></StyledBtn>
        <StyledBtn onClick={e => setUserType('office')}>New Office<Icon left>group_add</Icon></StyledBtn>
      </StyledFrame>
      { renderForm() }
    </StyledContainer>
  )
}

export default CreateUserContainer;
