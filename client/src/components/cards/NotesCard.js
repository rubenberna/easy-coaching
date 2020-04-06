import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { Textarea, Button } from 'react-materialize'

import { AuthContext } from '../../connectors/auth/Auth'
import { updateTask } from '../../services/dbQueries'

const StyledNotesCard = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const StyledNewNote = styled.div`

`

const NotesCard = ({ task }) => {
  const [ newNote, setNewNote ] = useState(false)
  const [ noteText, setNoteText ] = useState('')
  const [ notesList, setNotesList ] = useState(task.notes)
  const { userProfile } = useContext(AuthContext)

  useEffect(() => {
    console.log('setting notes');
    task.notes = notesList    
    updateTask(task)
  },[notesList])

  const renderInput = () => {
    if(newNote) return <Textarea
      label='Text'
      onChange={e => setNoteText(e.target.value)}/>
  }

  const renderButton = () => {
    if (userProfile && userProfile.type === 'coach') return (
      <Button onClick={handleClick}>{!newNote ? 'NEW' : 'SUBMIT'}</Button>
    ) 
    else return ''
  }

  const handleClick = () => {
    if (!newNote) setNewNote(true)
    else validate()
  }

  const validate = () => {
    if (!noteText) alert('Please enter a note first')
    else submitNote()
  }

  const submitNote = async () => {
    if (notesList) {
      let list = [...notesList, noteText]
      setNotesList(list)
    }
    else setNotesList([noteText])
    setNewNote(false)
    task.notes = notesList
    setTimeout(() => updateTask(task), 1000)
  }

  const renderNotes = () => {
    if (notesList.length) return (
      <ul className='collection'>
        {notesList.map( (note, i) => <li className='collection-item' key={i}>{note}</li>)}
      </ul>
    )
    else return <p>Leave your first note</p>
  }

  return(
    <StyledNotesCard>
      Registered notes:
      { renderNotes() }
      <StyledNewNote>
        { renderButton() }
        { renderInput() }
      </StyledNewNote>
    </StyledNotesCard>
  )
}

export default NotesCard;
