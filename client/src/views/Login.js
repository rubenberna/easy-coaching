import React, { useCallback, useContext, useState } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from 'react-materialize'
import firebaseApp from '../config/firebaseConfig'

import { AuthContext } from '../connectors/auth/Auth'
import { PasswordModal } from '../components/modal/ResetPasswordModal'

const StyledLogin = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledInput = styled.div`
`

const StyledReset = styled.span`
  color: #00796b;
  font-size: 12px;
  font-weight: 300;
  padding-top: 20px;
`

const StyledActions = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledErrorNotification = styled.span`
  color: 'red'
`

const Login = ({ history }) => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false)

  const handleLogin = useCallback(
    async event => {
      event.preventDefault()
      const { email, password } = event.target.elements;
      try {
        await firebaseApp
          .auth()
          .signInWithEmailAndPassword(email.value.toLowerCase(), password.value)
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
      .catch(() => setError(true));
  }

  const { currentUser } = useContext(AuthContext)
  if (currentUser) {
    return <Redirect to='/' />
  }
  return (
    <StyledLogin className='ui container'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <StyledInput>
          <label>
            Email
            <input name='email' type='email' placeholder='Email' />
          </label>
        </StyledInput>
        <StyledInput>
          <label>
            Password
            <input name='password' type='password' placeholder='Password' />
          </label>
        </StyledInput>
        <StyledActions>
          <Button type='submit'>Log in</Button>
          <StyledReset>Forgot password?
            <strong
              style={{ cursor: 'pointer' }}
              onClick={toggleModal}>
              Reset here
            </strong>
          </StyledReset>
        </StyledActions>
      </form>
      <PasswordModal
        show={showModal}
        toggle={toggleModal}
        resetPassword={resetPassword}
      />
      {error && <StyledErrorNotification>User not found</StyledErrorNotification>}
    </StyledLogin>
  )
}

export default withRouter(Login);



// class Login extends Component {
//
//   state = {
//     wrongCredentials: false,
//     user: ''
//   }
//
//   validateUser = (user) => {
//     const { coaches, history, setCoach } = this.props
//     const coach = coaches.find( coach => coach.email.toLowerCase() === user.email.toLowerCase() )
//     if (!coach) this.setState({ wrongCredentials: true })
//     else {
//       if ( coach.password !== user.password ) {
//         this.setState({
//           wrongCredentials: true
//         })
//       } else {
//         setCoach(coach)
//         history.push('/')
//       }
//     }
//   }
//
//
//
//   render() {
//     return(
//       <div className='login'>
//         {this.state.wrongCredentials && <h6 className='wrong'>Wrong credentials</h6>}
//         <LoginForm
//           validate={ this.validateUser }
//           wrongCredentials={this.state.wrongCredentials}/>
//       </div>
//     )
//   }
// }
//
// export default withRouter(Login);
