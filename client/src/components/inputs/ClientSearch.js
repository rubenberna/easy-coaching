import React, {useState, useEffect } from 'react'
import styled from 'styled-components'
import { TextInput, Icon, Button, Preloader } from 'react-materialize'
import { Alert } from 'react-bootstrap';

import { getUser } from '../../modules/sfQueries'

const StyledInput = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 992px) {
    width: 220px;
    margin-left: -37px;
    flex-direction: column;
    height: 135px;
  }
`

const StyledDetails = styled.div`
  margin-top: 10px;
  margin-bottom: 17px;
  padding: 17px;
  background: #a5d6a7;
  position: relative;
  border-radius: 15px;
`

const StyledClose = styled.span`
  position: absolute;
  top: 8px;
  right: 14px;
  color: #2e7d32;
  cursor: pointer;
  transition: 0.3s all;
  &:hover {
    color: #1b5e20;
  }
}
`

const ClientSearch = ({setUser}) => {
  const [client, setClient] = useState('')
  const [clientID, setClientID] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => setUser('client', client), [client, setUser])

  const searchClient = async () => {
    if (!clientID) setError('Please enter an id first')
    else {
      setLoading(true)
      const res = await getUser(clientID)
      if (typeof res === 'string') setError(res)
      if (typeof res === 'object') setClient(res)
      setLoading(false)
    }
  }

  const closeDetails = () => {
    setClient('')
    setClientID('')
  }

  const renderInput = () => {
    if(!client && !error) {
      return (
        <StyledInput>
          <TextInput
            icon={<Icon>account_circle</Icon>}
            label="Client id"
            type="number"
            onChange={e => setClientID(e.target.value.replace(/\s/g, ""))}
          />
          <Preloader active={loading} size='small' color='yellow'/>
          <Button onClick={searchClient}>Go</Button>
        </StyledInput>
      )
    } else if (error) {
      return <Alert variant='warning' onClose={() => setError('')} dismissible>{error}</Alert>
    } else {
      return (
        <>
          <h5>Client details:</h5>
          <StyledDetails>
            <p>Client Name: {client.Name}</p>
            <p>Email: <a href={`mailto:${client.Email}`} target="_blank" rel="noopener noreferrer">{client.Email}</a></p>
            <p>Phone: <a href={`tel: ${client.Phone}`}>{client.Phone}</a></p>
            <p>Address: <a href={`https://maps.google.com/?q=${client.MailingAddress.street}, ${client.MailingAddress.city}`} target="_blank" rel="noopener noreferrer">{client.MailingAddress.street}, {client.MailingAddress.city}</a></p>
            <p>Office: <a href={`https://maps.google.com/?q=${client.Account.BillingAddress.street}, ${client.Account.BillingAddress.city}`} target="_blank" rel="noopener noreferrer">{client.Account.Name}</a></p>
            <StyledClose onClick={closeDetails}>x</StyledClose>
          </StyledDetails>
        </>
      )
    }
  }

  return renderInput()
}

export default ClientSearch;
