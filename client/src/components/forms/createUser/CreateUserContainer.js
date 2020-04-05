import React, { useState, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Icon } from 'react-materialize'

import { getCoaches, createNewCoach, createNewOffice } from '../../../services/dbQueries'
import { AuthContext } from '../../../connectors/auth/Auth'
import {firebaseApp} from '../../../config/firebaseConfig'
import NewCoach from './NewCoach'
import NewOffice from './NewOffice'

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
  const { dispatch, dispatchCoaches } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)

  const renderForm = () => {
    if (userType === 'coach') return (
      <NewCoach
        createCoach={createCoach}
        loading={loading}
      />
    )
    if (userType === 'office') return (
      <NewOffice
        createOffice={createOffice}
        loading={loading}
      />
    )
  }

  const createCoach = async (coach) => {
    setLoading(true)
    await createNewCoach(coach)
    await createAuth(coach)
    const coaches = await getCoaches()
    dispatchCoaches({
      type: 'SET_COACHES',
      payload: coaches
    })
    setLoading(false)
    props.history.push('/')
  }

  const createOffice = async (office) => {
    setLoading(true)
    await createNewOffice(office)
    await createAuth(office)
    setLoading(false)
    props.history.push('/')
  }

  const createAuth = async (user) => {
    let { email, password } = user
    await firebaseApp.auth().createUserWithEmailAndPassword(email, password.toLowerCase()).catch((err) => console.log(err.message))
    await logAdminBackIn()
  }

  const logAdminBackIn = async () => {
    firebaseApp.auth().signOut()
    dispatch({ type: 'LOGOUT' })
    await firebaseApp.auth().signInWithEmailAndPassword('Sara.troisfontaine@easylifedc.be', 'Sara3Fontaine')
      .then(res => res)
      .catch(error => console.log(error))
  }

  return (
    <StyledContainer>
      <StyledFrame>
        <StyledBtn onClick={e => setUserType('coach')}>New Coach<Icon left>face</Icon></StyledBtn>
        <StyledBtn onClick={e => setUserType('office')}>New Office<Icon left>group_add</Icon></StyledBtn>
      </StyledFrame>
      {renderForm()}
    </StyledContainer>
  )
}

export default withRouter(CreateUserContainer);
