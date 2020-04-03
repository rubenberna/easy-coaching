import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';

export const PasswordModal = ({ toggle, show, resetPassword }) => {
  const [email, setEmail] = useState('')

  const handleSubmit = () => {
    resetPassword(email)
    toggle()
  }

  return (
    <Modal show={show} onHide={toggle}>
      <Modal.Header closeButton>
        <Modal.Title>Reset password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Please enter your email below
       <input type='email' onChange={e => setEmail(e.target.value)} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className='mr-1' onClick={toggle}>
          Close
          </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Send
          </Button>
      </Modal.Footer>
    </Modal>
  )
}