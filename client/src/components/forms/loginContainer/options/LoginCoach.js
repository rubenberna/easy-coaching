import React from 'react'
import { Button, TextInput } from 'react-materialize'

import {useFormInput} from '../../../../services/hooks'
import { StyledLogin, StyledInput, StyledActions } from './style'
import ResetPassword from './ResetPassword'

const Login = ({ handleLogin, toggleModal }) => {
  const email = useFormInput('')
  const password = useFormInput('') 

  const handleClick = () => {
    const coach = {
      email: email.value,
      password: password.value
    }
    handleLogin(coach)  
  }

  return (
    <StyledLogin>
      <StyledInput>
        <TextInput label='Email' type='email' placeholder='Email' {...email} />
      </StyledInput>
      <StyledInput>
        <TextInput label='Password' type='password' placeholder='Password' {...password} />
      </StyledInput>
      <StyledActions>
        <Button type='submit' onClick={handleClick}>Log in</Button>
        <ResetPassword toggleModal={toggleModal}/>
      </StyledActions>
    </StyledLogin>
  )
}

export default Login;

