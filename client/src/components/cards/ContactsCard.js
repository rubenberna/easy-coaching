import React from 'react'

const ContactsCard = ({task}) => {

  const clientDetails = () => {
    if(task.client) return (
      <>
        <div className='contacts-card client'>
          <h4>Client details</h4>
          <hr/>
          <h6><span className='task-spec'>Name: </span>{task.client.Name}</h6>
          <h6><span className='task-spec'>Email: <a href={`mailto:${task.client.Email}`} target="_blank" rel="noopener noreferrer">{task.client.Email}</a></span></h6>
          <h6><span className='task-spec'>Phone: <a href={`tel: ${task.client.Phone}`}>{task.client.Phone}</a></span></h6>
          <h6><span className='task-spec'>Address: <a href={`https://maps.google.com/?q=${task.client.MailingAddress.street}, ${task.client.MailingAddress.city}`} target="_blank" rel="noopener noreferrer">{task.client.MailingAddress.street}, {task.client.MailingAddress.city}</a></span></h6>
          <h6><span className='task-spec'>Frequentie: </span>{task.client.Frequentie__c}</h6>
        </div>
        <br/>
      </>
    )
  }

  const hkDetails = () => {
    if (task.houseKeeper) return (
      <div className='contacts-card hk'>
        <h4>Housekeeper details</h4>
        <hr/>
        <h6><span className='task-spec'>Name: </span>{task.houseKeeper.Name}</h6>
        <h6><span className='task-spec'>Email: <a href={`mailto:${task.houseKeeper.Email}`} target="_blank" rel="noopener noreferrer">{task.houseKeeper.Email}</a></span></h6>
        <h6><span className='task-spec'>Phone: <a href={`tel: ${task.houseKeeper.Phone}`}>{task.houseKeeper.Phone}</a></span></h6>
        <br/>
        <span>Working hours</span>
        <h6><span className='task-spec'>From: </span>{task.hkFrom}</h6>
        <h6><span className='task-spec'>Until: </span>{task.hkUntil}</h6>
        <h6><span className='task-spec'>Frequentie: </span>{task.houseKeeper.Frequentie__c}</h6>
      </div>
    )
  }

  const lackOfDetails = () => {
    if (!task.houseKeeper) return <h6>*Client coaching only</h6>
    if (!task.client) return <h6>*HouseKeeper coaching only</h6>
  }

  return(
    <div className='contacts-card'>
      {clientDetails()}
      {hkDetails()}
      {lackOfDetails()}
    </div>
  )
}

export default ContactsCard;
