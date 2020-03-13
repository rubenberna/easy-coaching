import React, { useState } from 'react'
import styled from 'styled-components'
import { Alert } from 'react-bootstrap';

import './views.scss'
import Gallery from '../components/galery/Galery'
import NewTaskForm from '../components/forms/NewTaskForm'


const StyledAlert = styled(Alert)`
  position: fixed;
  right: 10px;
  height: 50px;
  @media (max-width: 992px) {
    top: 0;
    right: auto;
  }
`

export default function Home({ getTasks }){
  const [ error, setError ] = useState(false)

  return(
    <div className='home'>
      <Gallery/>
      <NewTaskForm getTasks={getTasks} setError={setError}/>
      {
        error &&
        <StyledAlert
        variant='danger'
        onClose={() => setError(false)}
        dismissible>
        Some fields are missing
        </StyledAlert>
      }
    </div>
  )
}
