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
  background: #e3f2fd ;
  position: relative;
  border-radius: 15px;
`

const StyledClose = styled.span`
  position: absolute;
  top: 8px;
  right: 14px;
  color: #1e88e5;
  cursor: pointer;
  transition: 0.3s all;
  &:hover {
    color: #1976d2;
  }
}
`

const StyledPrefix = styled.span`
  background: #e0e0e0;
  padding: 5px 10px;
`

const HKSearch = ({setUser}) => {
  const [hk, setHk] = useState('')
  const [hkID, setHkID] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => setUser('houseKeeper', hk), [hk, setUser])

  const searchHk = async () => {
    if (!hkID) setError('Please enter an id first')
    else {
      setLoading(true)
      const res = await getUser(hkID)
      if (typeof res === 'string') setError(res)
      if (typeof res === 'object') setHk(res)
      setLoading(false)
    }
  }

  const closeDetails = () => {
    setHk()('')
    setHkID('')
  }

  const renderInput = () => {
    if(!hk && !error) {
      return (
        <StyledInput>
          <StyledPrefix>EMP</StyledPrefix>
          <TextInput
            label="HouseKeeper id"
            onChange={e => setHkID(`EMP${e.target.value.replace(/\s/g, "")}`)}
          />
          <Preloader active={loading} size='small' color='yellow'/>
          <Button onClick={searchHk}>Go</Button>
        </StyledInput>
      )
    } else if (error) {
      return <Alert variant='warning' onClose={() => setError('')} dismissible>{error}</Alert>
    } else {
      return (
        <>
          <h5>HouseKeeper details:</h5>
          <StyledDetails>
            <p>Hk Name: {hk.Name}</p>
            <p>Email: <a href={`mailto:${hk.Email}`} target="_blank" rel="noopener noreferrer">{hk.Email}</a></p>
            <p>Phone: <a href={`tel: ${hk.Phone}`}>{hk.Phone}</a></p>
            <p>Address: <a href={`https://maps.google.com/?q=${hk.MailingAddress.street}, ${hk.MailingAddress.city}`} target="_blank" rel="noopener noreferrer">{hk.MailingAddress.street}, {hk.MailingAddress.city}</a></p>
            <StyledClose onClick={closeDetails}>x</StyledClose>
          </StyledDetails>
        </>
      )
    }
  }

  return renderInput()
}

export default HKSearch;
