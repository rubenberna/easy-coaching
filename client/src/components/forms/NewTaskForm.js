import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { TextInput, Textarea, Toast, Button } from 'react-materialize'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers'
import _ from 'lodash'
import { addTask } from '../../modules/dbQueries'
import TaskDropdown from '../dropdowns/TaskDropdown'
import AssigneeDropdown from '../dropdowns/AssigneeDropdown'
import ClientSearch from '../inputs/ClientSearch'
import HKSearch from '../inputs/HKSearch'

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
    redirect: false
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

  handleStartTime = e => {
    const hours = e.getHours()
    const mins = e.getMinutes()
    const start = this.state.date
    start.setHours(hours)
    start.setMinutes(mins)
    this.setState({ start })
  }

  handleEndTime = e => {
    const hours = e.getHours()
    const mins = e.getMinutes()
    const end = new Date(this.state.date.getTime())
    end.setHours(hours)
    end.setMinutes(mins)
    this.setState({ end })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { assignee, client, houseKeeper } = this.state
    const task = _.omit(this.state, ['redirect', 'ready', 'date'])
    const coach = this.props.coaches.find(coach => coach.name === assignee)
    task.coach = coach
    task.clientName = client.Name
    task.houseKeeperName = houseKeeper.Name
    task.office = client.Account.Name

    const res = await addTask(task)
    console.log(res);
    await this.props.getTasks()
    this.setState({ ready: true  })
  }

  setUser = (type, data) => {
    let obj = {}
    obj[type] = data
    this.setState({ ...obj })
  }

  renderButton = () => {
    // Validate if there are null values
    let array = Object.values(this.state)
    let incomplete = array.some(value => {return value === null})

    // Alert if there are null values
    if (incomplete) {
      return (
        <Toast
          waves="light"
          style={{marginRight: '5px'}}
          options={{html: 'New task incomplete!'}}>
          Submit
        </Toast>
      )
      // Submit form otherwise
    } else return (
      <Button
        waves="light"
        style={{marginRight: '5px', background: '#009688', color: '#FFF'}}
        onClick={ this.handleSubmit }>
        Submit
      </Button>
    )
  }

  render() {
    const {
      ready,
      start,
      date,
      end
     } = this.state
    if (ready ) { return <Redirect to='/ongoing' /> }

    return(
      <div className='task-form'>
        <h4>New task</h4>
        <TextInput  label='Title' onChange={e => this.handleChange('title', e)}/>
        <Textarea label='Extra info'onChange={e => this.handleChange('description', e)} />
        <TaskDropdown setSelection={ this.handleSelectType }/>
        <AssigneeDropdown
          coaches={this.props.coaches}
          setSelection={this.handleSelectType}/>
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
            <KeyboardTimePicker
              margin="normal"
              label="End Time"
              ampm={false}
              value={end}
              onChange={e => this.handleEndTime(e)}
              KeyboardButtonProps={{
                'aria-label': 'change time',
                }}
              />
          </MuiPickersUtilsProvider>
        </div>
        {this.renderButton()}
      </div>
    )
  }
}

export default NewTaskForm;
