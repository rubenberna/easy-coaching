import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"

import { getTasks, updateTask } from '../modules/dbQueries'
import Dialog from '../components/modal/Modal'
import CoachFilter from '../components/buttons/CoachFilter'

const EventDetail = ({ event, el }) => {
  const content = <div>
    <p>Client: {event.extendedProps.client}</p>
    <p>Sollicitant: {event.extendedProps.hk}</p>
    <p>Office: {event.extendedProps.office}</p>
    <p>Priority: {event.extendedProps.priority}</p>
  </div>;
  ReactDOM.render(content, el);
  return el;
}

class Calendar extends Component {
  state = {
    tasks: [],
    currEvent: null,
    modalOpen: false,
    selectedCoach: ''
  }

  async componentDidMount() {
    const tasks = await getTasks()
    this.setState({ tasks  })
  }

  filterCoach = (coach) => this.setState({ selectedCoach: coach })

  calendarComponentRef = React.createRef()
  tasksList = () => {
    const { tasks, selectedCoach } = this.state
    let list = []
    if (selectedCoach) {
      list = tasks.filter(t => t.assignee === selectedCoach )
    } else list = tasks
    const events = list.map(t => (
      { start: t.start,
        end: t.end,
        title: t.title,
        description: t.description,
        assignee: t.assignee,
        reqDate: t.reqDate,
        textColor: '#FFF',
        backgroundColor: t.type.toLocaleLowerCase() === 'starter' ? '#ffd600' : t.coach.calendarColor,
        client: t.client.Name,
        clientEmail: t.client.Email,
        clientPhone: t.client.Phone,
        clientAddress: `${t.client.MailingAddress.street}, ${t.client.MailingAddress.city}`,
        hk: t.houseKeeper.Name,
        hkEmail: t.houseKeeper.Email,
        hkPhone: t.houseKeeper.Phone,
        office: t.office,
        reason: t.type,
        priority: t.priority,
        startEditable: t.type.toLocaleLowerCase() === 'starter' ? false : true,
        durationEditable: t.type.toLocaleLowerCase() === 'starter' ? false : true
      }
    ))
    return events
  }

  handleDateClick = arg => {
    console.log('arg: ', arg);
  }

  handleEventClick = ({ event }) => {
    this.setState({ currEvent: event, modalOpen: true })
  }

  handleResize = ({ event }) => {
    const task = {
      start: event.start,
      end: event.end,
      title: event.title,
      reqDate: event.extendedProps.reqDate
    }
    updateTask(task)
  }

  handleDrop = ({ event }) => {
    const task = {
      start: event.start,
      end: event.end,
      title: event.title,
      reqDate: event.extendedProps.reqDate
    }
    updateTask(task)
  }

  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  render() {
    const { modalOpen, currEvent } = this.state
    return(
      <div className='calendar container'>
        <div className='calendar-app'>
          <FullCalendar
            defaultView='timeGridWeek'
            ref={ this.calendarComponentRef }
            weekends={false}
            minTime='08:00:00'
            maxTime='18:00:00'
            slotDuration='00:30:00'
            allDaySlot={false}
            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
            editable
            header={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            }}
            selectable
            selectHelper
            timezone='local'
            events={this.tasksList()}
            dateClick={this.handleDateClick}
            eventClick={this.handleEventClick}
            eventDrop={this.handleDrop}
            eventResize={this.handleResize}
            eventRender={EventDetail}
          />
        </div>
        <CoachFilter coaches={this.props.coaches} filterCoach={this.filterCoach}/>
        {currEvent &&
          <Dialog
            modalOpen={modalOpen}
            currEvent={currEvent}
            closeModal={this.closeModal}/>
        }
      </div>
    )
  }
}

export default Calendar;
