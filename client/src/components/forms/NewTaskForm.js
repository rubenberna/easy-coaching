import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { addTask } from '../../modules/dbQueries'
import { TextInput, Textarea, Toast, Button } from 'react-materialize'
import TaskDropdown from '../dropdowns/TaskDropdown'
import AssigneeDropdown from '../dropdowns/AssigneeDropdown'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers'

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
    const { title, assignee, description, type, start, end } = this.state
    const coach = this.props.coaches.find(coach => coach.name === assignee)

    const task = {
      title,
      assignee,
      description,
      type,
      start,
      end,
      backgroundColor: coach.color,
      complete: false,
      status: 'not started',
      reqDate: new Date()
    }
    const res = await addTask(task)
    console.log(res);
    await this.props.getTasks()
    this.setState({ ready: true  })
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
        <Textarea label='Description'onChange={e => this.handleChange('description', e)} />
        <TaskDropdown setSelection={ this.handleSelectType }/>
        <AssigneeDropdown
          coaches={this.props.coaches}
          setSelection={this.handleSelectType}/>
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
