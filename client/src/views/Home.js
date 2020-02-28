import React, { useState } from 'react'
import styled from 'styled-components'
import { Alert } from 'react-bootstrap';

import './views.scss'
import Gallery from '../components/galery/Galery'
import NewTaskForm from '../components/forms/NewTaskForm'


const StyledAlert = styled(Alert)`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  height: 50px;
  z-index: 999;
`

export default function Home({ coaches, getTasks }){
  const [ error, setError ] = useState(false)

  return(
    <div className='home container'>
      <Gallery coaches={coaches} />
      <NewTaskForm coaches={coaches} getTasks={getTasks} setError={setError}/>
      {
        error &&
        <StyledAlert
        variant='warning'
        onClose={() => setError(false)}
        dismissible>
        Some fields are missing
        </StyledAlert>
      }
    </div>
  )
}
