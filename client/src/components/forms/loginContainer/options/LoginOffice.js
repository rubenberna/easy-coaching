import React, { useContext } from 'react'
import { Select, Button, TextInput } from 'react-materialize'
import { AuthContext } from '../../../../connectors/auth/Auth'
import { useFormInput } from '../../../../services/hooks'
import { StyledLogin, StyledInput, StyledActions } from './style'
import ResetPassword from './ResetPassword'
import './style.scss';

const LoginOffice = ({ handleLogin, toggleModal}) => {
  const email = useFormInput('') 
  const password = useFormInput('') 
  const { offices } = useContext(AuthContext)

  const handleClick = () => {
    const office = {
      email: email.value,
      password: password.value
    }
    handleLogin(office)
  }

  const renderSelect = () => (
    <Select value={email} label='Select office' {...email}>
      <option disabled value="" defaultValue>
        Office name
      </option>
      { offices.map((office, i) => <option key={i} value={office.email}>{office.name}</option>)}
    </Select>
  )

  return (
    <StyledLogin>
      {renderSelect()}
      <StyledInput>
        <TextInput type='password' placeholder='Password' label='Password' {...password}/>
      </StyledInput>
      <StyledActions>
        <Button type='submit' onClick={handleClick}>Log in</Button>
        <ResetPassword toggleModal={toggleModal} />
      </StyledActions>
    </StyledLogin>
  )
}

export default LoginOffice
