import React from 'react'
import styled from 'styled-components'
import { Modal, Button } from 'react-materialize'

const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`

export default function DeleteModal({ handleDelete }) {

  return (
    <Modal
      actions={[
        <Actions>
        <Button flat modal="close" node="button" waves="green">Not really</Button>
        <Button flat modal="close" node="button" waves="red" onClick={ handleDelete }>Yes, I am</Button>
        </Actions>
      ]}
      bottomSheet={false}
      fixedFooter={false}
      header="Are you sure?"
      id="modal-0"
      options={{
        dismissible: true,
        endingTop: '10%',
        inDuration: 250,
        onCloseEnd: null,
        onCloseStart: null,
        onOpenEnd: null,
        onOpenStart: null,
        opacity: 0.5,
        outDuration: 250,
        preventScrolling: true,
        startingTop: '4%'
      }}
      trigger={<Button node="button">DELETE</Button>}
    >
    </Modal>
  )
}
