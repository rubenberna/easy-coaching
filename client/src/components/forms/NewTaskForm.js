import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { TextInput, Textarea, Button } from 'react-materialize'
import { Alert } from 'react-bootstrap';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers'
import _ from 'lodash'

import { addTask } from '../../modules/dbQueries'
import { createTaskSF } from '../../modules/sfQueries'
import TaskDropdown from '../dropdowns/TaskDropdown'
import AssigneeDropdown from '../dropdowns/AssigneeDropdown'
import ClientSearch from '../inputs/ClientSearch'
import HKSearch from '../inputs/HKSearch'
import PriorityDropdown from '../dropdowns/PriorityDropdown'

import './form.scss'

class NewTaskForm extends Component {
  state = {
    title: null,
    description: null,
    assignee: null,
    type: null,
    date: null,
    start: null,
    end: null,
    client: null,
    houseKeeper: null,
    status: 'not started',
    reqDate: new Date(),
    ready: false,
    redirect: false,
    alertMsg: false,
  }

  handleChange = (name, e) => {
    let change = {}
    let inputValue = e.target.value
    change[name] = inputValue
    this.setState({ ...change })
  }

  handleSelectType = (action) => {
    this.setState({ ...action })
  }

  handleStartTime = async e => {
    const hours = e.getHours()
    const mins = e.getMinutes()
    const start = this.state.date
    start.setHours(hours)
    start.setMinutes(mins)
    await this.setState({ start })
    const endTime = moment(this.state.start).add(90, 'minutes')
    this.setState({ end: endTime._d })

  }

  handleSubmit = async (e) => {
    e.preventDefault()
    let validationObj = _.omit(this.state, ['redirect', 'ready', 'date', 'client', 'houseKeeper'])
    let array = Object.values(validationObj)
    if ((this.state.client || this.state.houseKeeper) && array.every(value => value !== null)) {
      alert('Ready to go')
    } else this.setState({ alertMsg: true })

    // let incomplete = array.some(value => {return value === null})
    //
    // const { assignee, client, houseKeeper } = this.state
    // const task = _.omit(this.state, ['redirect', 'ready', 'date'])
    // const coach = this.props.coaches.find(coach => coach.name === assignee)
    // task.coach = coach
    // task.clientName = client.Name
    // task.houseKeeperName = houseKeeper.Name
    // task.office = client.Account.Name
    //
    // const res = await addTask(task)
    // createTaskSF(task)
    // console.log(res);
    // await this.props.getTasks()
    // this.setState({ ready: true  })
  }

  setUser = (type, data) => {
    let obj = {}
    obj[type] = data
    this.setState({ ...obj })
  }

  render() {
    const {
      ready,
      start,
      date,
      alertMsg
     } = this.state
    if (ready ) { return <Redirect to='/ongoing' /> }

    return(
      <div className='task-form'>
        { alertMsg && <Alert variant='danger' onClose={() => this.setState({ alertMsg: false })} dismissible>Some fields are missing</Alert> }
        <h4>New task</h4>
        <TextInput label='Title' onChange={e => this.handleChange('title', e)}/>
        <Textarea label='Extra info'onChange={e => this.handleChange('description', e)} />
        <TaskDropdown setSelection={ this.handleSelectType }/>
        <AssigneeDropdown
          coaches={this.props.coaches}
          setSelection={this.handleSelectType}/>
        <PriorityDropdown setSelection={this.handleSelectType}/>
        <ClientSearch setUser={this.setUser}/>
        <HKSearch setUser={this.setUser}/>
        <div className='task-form-date'>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Start date"
              value={date}
              onChange={e => this.setState({ date: e })}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              label="Start Time"
              ampm={false}
              value={start}
              onChange={e => this.handleStartTime(e) }
              KeyboardButtonProps={{
              'aria-label': 'change time',
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        <Button
          waves="light"
          style={{marginRight: '5px', background: '#009688', color: '#FFF'}}
          onClick={ this.handleSubmit }>
          Submit
        </Button>
      </div>
    )
  }
}

export default NewTaskForm;
