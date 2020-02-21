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

const detailsDiv = {
  marginTop: '15px'
}

const detailsInfo = {
  fontWeight: 100
}

const Dialog = ({modalOpen, currEvent, closeModal }) => {

  const clientDetails = () => {
    if(currEvent.extendedProps.client !== 'none') return (
      <div style={detailsDiv}>
        <h6>Client details</h6>
        <h6 style={detailsInfo}>Name: {currEvent.extendedProps.client}</h6>
        <h6 style={detailsInfo}>Phone: <a href={`tel: ${currEvent.extendedProps.clientPhone}`}>{currEvent.extendedProps.clientPhone}</a></h6>
        <h6 style={detailsInfo}>Email: <a href={`mailto:${currEvent.extendedProps.clientEmail}`} target="_blank" rel="noopener noreferrer">{currEvent.extendedProps.clientEmail}</a></h6>
        <h6 style={detailsInfo}>Address: <a href={`https://maps.google.com/?q=${currEvent.extendedProps.clientAddress}`} target="_blank" rel="noopener noreferrer">{currEvent.extendedProps.clientAddress}</a></h6>
      </div>
    )
  }

  const houseKeeperDetails = () => {
    if(currEvent.extendedProps.hk !== 'none') return (
      <div style={detailsDiv}>
        <h6>Housekeeper details</h6>
        <h6 style={detailsInfo}>Name: {currEvent.extendedProps.hk}</h6>
        <h6 style={detailsInfo}>Phone: <a href={`tel: ${currEvent.extendedProps.hkPhone}`}>{currEvent.extendedProps.hkPhone}</a></h6>
        <h6 style={detailsInfo}>Email: <a href={`mailto:${currEvent.extendedProps.hkEmail}`} target="_blank" rel="noopener noreferrer">{currEvent.extendedProps.hkEmail}</a></h6>
      </div>
    )
  }

  const lackOfDetails = () => {
    if(currEvent.extendedProps.hk === 'none') return <span>*Client coaching only</span>
    if(currEvent.extendedProps.client === 'none') return <span>*HouseKeeper coaching only</span>
  }

  return(
    <>
      <Modal
        show={modalOpen}
        onHide={closeModal}
        >
        <Modal.Header closeButton>
          <Modal.Title>{currEvent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currEvent.extendedProps.description}
          <br/>
          <h6>Office: { currEvent.extendedProps.office}</h6>
          <h6>Priority: { currEvent.extendedProps.priority.toUpperCase()}</h6>
          <br />
          { clientDetails() }
          { houseKeeperDetails() }
          <br />
          { lackOfDetails() }
        </Modal.Body>
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
