import React from 'react'
import { StyledReset } from './style'

const ResetPassword = ({ toggleModal }) => {
  return (
    <StyledReset>
      Forgot password?
      <strong
        style={{ cursor: 'pointer' }}
        onClick={toggleModal}>
        Reset here
      </strong>   
    </StyledReset>
  )
}

export default ResetPassword
