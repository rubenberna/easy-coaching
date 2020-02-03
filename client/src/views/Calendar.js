import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"

import { getTasks, updateTask } from '../modules/dbQueries'

import Dialog from '../components/modal/Modal'

class Calendar extends Component {
  state = {
    tasks: [],
    currEvent: null,
    modalOpen: false
  }

  async componentDidMount() {
    const tasks = await getTasks()
    this.setState({ tasks  })
  }

  calendarComponentRef = React.createRef()
  tasksList = () => {
    const events = this.state.tasks.map(t => (
      { start: t.start,
        end: t.end,
        title: t.title,
        description: t.description,
        assignee: t.assignee,
        reqDate: t.reqDate,
        textColor: '#FFF',
        backgroundColor: t.calendarColor
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
      <div className='calendar'>
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
          />
        </div>
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
