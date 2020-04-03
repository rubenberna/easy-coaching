import React, {useState} from 'react'
import styled from 'styled-components'
import { TextInput, Button } from 'react-materialize'
import { useFormInput } from '../../../services/hooks'
import Loader from '../../loader/Loader'

const StyledError = styled.h5`
  color: red;
  padding: 15px 0;
`

const NewOffice = ({ createOffice, loading }) => {
  const name = useFormInput('')
  const email = useFormInput('')
  const password = useFormInput('')
  const [error, setError] = useState(false)

  const handleClick = () => {
    if(!name.value || !email.value || !password.value) setError(true)
    else {
      let office = {
        name: name.value, 
        email: email.value.toLowerCase(), 
        password: password.value
      }
      createOffice(office)
    }
  }

  const renderError = () => {
    if(error) return <StyledError>Please fill in all fields</StyledError>
  }

  return (
    <div className='new-coach-form container'>
      <h3>New Coach form</h3>
      <TextInput label="Name" {...name}/>
      <TextInput label="Email" type='email' {...email}/>
      <TextInput label="Password" type='password' {...password}/>
      <Button onClick={handleClick} >Create</Button>
      {renderError()}
      {loading && <Loader />}
    </div>
  )
}

export default NewOffice


