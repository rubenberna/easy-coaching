import React, { useCallback, useContext } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from 'react-materialize'
import firebaseApp from '../config/firebaseConfig'
import LoginForm from '../components/forms/LoginForm'
import { AuthContext } from '../components/auth/Auth'

const StyledLogin = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledInput = styled.div`
`

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault()
      const { email, password } = event.target.elements;
      try {
        await firebaseApp
          .auth()
          .signInWithEmailAndPassword(email.value, password.value)
          history.push('/')
      } catch (e) {
        alert(e)
      }
    }, [history]
  );

  const { currentUser } = useContext(AuthContext)
  if (currentUser) {
    return <Redirect to='/' />
  }
  return(
    <StyledLogin className='ui container'>
      <h1>Login</h1>
      <form onSubmit={ handleLogin }>
        <StyledInput>
          <label>
            Email
            <input name='email' type='email' placeholder='Email'/>
          </label>
        </StyledInput>
        <StyledInput>
          <label>
            Password
            <input name='password' type='password' placeholder='Password'/>
          </label>
        </StyledInput>
        <Button type='submit'>Log in</Button>
      </form>
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
