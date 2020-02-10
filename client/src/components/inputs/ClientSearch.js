import React, {useState} from 'react'
import styled from 'styled-components'
import { TextInput, Icon, Button } from 'react-materialize'
import { Alert } from 'react-bootstrap';

import { getClient } from '../../modules/sfQueries'

const StyledInput = styled.div`
  display: flex;
  align-items: center;
`

const StyledDetails = styled.div`
  margin-top: 10px;
  padding: 17px;
  background: #eeeeee;
  position: relative;
  border-radius: 15px;
`

const StyledClose = styled.span`
  position: absolute;
  top: 8px;
  right: 14px;
  color: #bdbdbd;
  cursor: pointer;
  transition: 0.3s all;
  &:hover {
    color: #616161;
  }
}
`

const ClientSearch = () => {
  const [client, setClient] = useState('')
  const [clientID, setClientID] = useState('')
  const [error, setError] = useState('')

  const searchClient = async () => {
    const res = await getClient(clientID)
    if (typeof res === 'string') setError(res)
    if (typeof res === 'object') setClient(res)
  }

  const renderInput = () => {
    if(!client && !error) {
      return (
        <StyledInput>
          <TextInput
            icon={<Icon>account_circle</Icon>}
            label="Client id"
            type="number"
            onChange={e => setClientID(e.target.value)}
          />
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
            <StyledClose onClick={e => setClient('')}>x</StyledClose>
          </StyledDetails>
        </>
      )
    }
  }

  return renderInput()
}

export default ClientSearch;
