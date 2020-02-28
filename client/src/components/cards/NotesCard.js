import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Textarea, Button } from 'react-materialize'

import { addNote, getNotes } from '../../modules/dbQueries'

const StyledNotesCard = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const StyledNewNote = styled.div`

`

const NotesCard = ({ task, userLoggedIn }) => {
  const [ newNote, setNewNote ] = useState(false)
  const [ noteText, setNoteText ] = useState('')
  const [ notesList, setNotesList ] = useState([])

  useEffect(() => {
    async function fetchNotes() {
      const notes = await getNotes(task)
      setNotesList(notes)
    }
    fetchNotes()
  }, [task])

  const renderInput = () => {
    if(newNote) return <Textarea
      label='Text'
      onChange={e => setNoteText(e.target.value)}/>
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
    task.note = noteText
    addNote(task)
  }

  const renderNotes = () => {
    if (notesList) return (
      <ul className='collection'>
        {notesList.map( (note, i) => {
          return (
            <li className='collection-item' key={i}>{note}</li>
          )
        })}
      </ul>
    )
    else return <p>Leave your first note</p>
  }

  return(
    <StyledNotesCard>
      Registered notes:
      { renderNotes() }
      <StyledNewNote>
        <Button onClick={handleClick}>{ !newNote ? 'NEW' : 'SUBMIT'}</Button>
        { renderInput() }
      </StyledNewNote>
    </StyledNotesCard>
  )
}

export default NotesCard;
