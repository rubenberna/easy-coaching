import React, { Component, useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"
import { AuthContext } from '../connectors/auth/Auth'
import { TasksContext } from '../connectors/tasks'
import { getTasks, updateTask } from '../services/dbQueries'
import CalendarModal from '../components/modal/CalendarModal'
import CoachFilter from '../components/buttons/CoachFilter'

const EventDetail = ({ event, el }) => {
  const content = <div>
    <p>Client: {event.extendedProps.client}</p>
    <p>HouseKeeper: {event.extendedProps.hk}</p>
    <p>Office: {event.extendedProps.office}</p>
    <p>Priority: {event.extendedProps.priority}</p>
  </div>;
  ReactDOM.render(content, el);
  return el;
}

const Calendar = () => {
  const { tasks } = useContext(TasksContext)
  const { coaches, userProfile } = useContext(AuthContext)
  const [currEvent, setCurrEvent] = useState('')
  const [selectedCoach, setSelectedCoach] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const filterCoach = (coach) => setSelectedCoach(coach)

  const calendarComponentRef = React.createRef()

  const checkIfEventIsEditable = (task) => {
    if (!userProfile) return false
    else if (task.type.toLocaleLowerCase() === 'starter' && !userProfile.admin) return false
    else if (userProfile.admin) return true
  }

  const tasksList = () => {
    let list = tasks.filter(t => t.status !== 'cancelled')
    if (selectedCoach) {
      list = list.filter(t => t.assignee === selectedCoach )
    }
    const events = list.map(t => (
      { start: t.start,
        end: t.end,
        title: t.title,
        description: t.description,
        assignee: t.assignee,
        reqDate: t.reqDate,
        textColor: '#FFF',
        backgroundColor: t.type.toLocaleLowerCase() === 'starter' ? '#ffd600' : getCalendarColor(t),
        client: t.client ? t.client.Name : 'none',
        clientEmail: t.client ? t.client.Email : 'no client',
        clientPhone: t.client ? t.client.Phone : 'no client',
        clientAddress: t.client ? `${t.client.MailingAddress.street}, ${t.client.MailingAddress.city}` : '',
        hk: t.houseKeeper ? t.houseKeeper.Name : 'none',
        hkEmail: t.houseKeeper ? t.houseKeeper.Email : 'no hk',
        hkPhone: t.houseKeeper ? t.houseKeeper.Phone : 'no hk',
        office: t.office,
        reason: t.type,
        priority: t.priority,
        startEditable: checkIfEventIsEditable(t),
        durationEditable: checkIfEventIsEditable(t),
      }
    ))
    return events
  }

  const getCalendarColor = task => {
    if (coaches.length) {
      const coach = coaches.find( coach => coach.name === task.assignee)
      return coach.calendarColor
    }
  }

  const handleDateClick = arg => {
    console.log('arg: ', arg);
  }

  const handleEventClick = ({ event }) => {
    setCurrEvent(event)
    setModalOpen(true)
  }

  const handleResize = ({ event }) => {
    const task = {
      start: event.start,
      end: event.end,
      title: event.title,
      reqDate: event.extendedProps.reqDate
    }
    updateTask(task)
  }

  const handleDrop = ({ event }) => {
    const task = {
      start: event.start,
      end: event.end,
      title: event.title,
      reqDate: event.extendedProps.reqDate
    }
    updateTask(task)
  }

  const closeModal = () => setModalOpen(false)
    return(
      <div className='calendar container'>
        <div className='calendar-app'>
          <FullCalendar
            defaultView='timeGridWeek'
            ref={ calendarComponentRef }
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
            events={tasksList()}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            eventDrop={handleDrop}
            eventResize={handleResize}
            eventRender={EventDetail}
          />
        </div>
        <CoachFilter filterCoach={filterCoach}/>
        {currEvent &&
          <CalendarModal
            modalOpen={modalOpen}
            currEvent={currEvent}
            closeModal={closeModal}/>
        }
      </div>
    )
}

export default Calendar;
