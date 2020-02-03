import React from 'react'
import { Modal } from 'react-bootstrap';
import moment from 'moment'

const paragraph = {
  textAlign: 'initial'
}
const bold = {
  fontWeight: 500,
  fontSize: '12px'
}

const thin = {
  fontWeight: 100,
  fontSize: '12px'
}

const modalFooter = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between'
}

const Dialog = ({modalOpen, currEvent, closeModal }) => {
  return(
    <>
      <Modal
        show={modalOpen}
        onHide={closeModal}
        >
        <Modal.Header closeButton>
          <Modal.Title>{currEvent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{currEvent.extendedProps.description}</Modal.Body>
        <Modal.Footer>
          <div style={modalFooter}>
            <div>
              <p style={paragraph}>
              <span style={bold}>Start: </span>
              <span style={thin}>{moment(currEvent.start).format('MMM Do YY, h:mm a')}</span>
              </p>
              <p style={paragraph}>
              <span style={bold}>End: </span>
              <span style={thin}>{moment(currEvent.end).format('MMM Do YY, h:mm a')}</span>
              </p>
            </div>
            <p>{currEvent.extendedProps.assignee}</p>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Dialog;
