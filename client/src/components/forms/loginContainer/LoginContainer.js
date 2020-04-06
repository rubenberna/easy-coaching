import React, { useState, useCallback, useContext } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { RadioGroup } from 'react-materialize'
import { AuthContext } from '../../../connectors/auth/Auth'
import {firebaseApp} from '../../../config/firebaseConfig'
import LoginCoach from './options/LoginCoach'
import LoginOffice from './options/LoginOffice'
import { PasswordModal } from '../../../components/modal/ResetPasswordModal'

const options = [
  { label: 'Coach', value: 'coach'},
  { label: 'Office', value: 'office'},
]

const Wrapper = styled.div`
  min-height: 60vh;
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width : 992px) {
    margin-top: 70px;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 380px;
`
const Intro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Title = styled.h1`
  padding-bottom: 13px;
`

const Selection = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 200px;
  margin-bottom: 30px;
`

const LoginContainer = ({ history }) => {
  const { currentUser } = useContext(AuthContext)
  const [showModal, setShowModal] = useState(false);
  const [activeType, setActiveType] = useState('coach')

  // const handleLogin = useCallback(
  //   async user => {
  //     const { email, password } = user;
  //     firebaseApp.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  //       .then(() => firebaseApp.auth().signInWithEmailAndPassword(email.toLowerCase(), password))
  //       .catch( error => alert(error))
  //   }, [history]
  // );
  const handleLogin = useCallback(
    async user => {
      const { email, password } = user;
      try {
        await firebaseApp
          .auth()
          .signInWithEmailAndPassword(email.toLowerCase(), password)
        history.push('/')
      } catch (e) {
        alert(e)
      }
    }, [history]
  );

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const resetPassword = (email) => {
    firebaseApp
      .auth()
      .sendPasswordResetEmail(email)
  }

  const renderLoginForm = () => {
    if (activeType === 'coach') return <LoginCoach handleLogin={handleLogin} toggleModal={toggleModal}/>
    else return <LoginOffice handleLogin={handleLogin} toggleModal={toggleModal}/>
  }

  if (currentUser) {
    return <Redirect to='/' />
  }

  return (
    <Wrapper className='ui container'>
      <Container>
        <Intro>
          <Title>Login type</Title>
          <Selection>
            <RadioGroup
            name="type of user"
            withGap
            label="Type of user"
            value={activeType}
            onChange={e => setActiveType(e.target.value)}
            options={options}
          />
          </Selection>
        </Intro>
        {renderLoginForm()}
        <PasswordModal
          show={showModal}
          toggle={toggleModal}
          resetPassword={resetPassword}
        />
      </Container>
    </Wrapper>
  )
}

export default withRouter(LoginContainer)