import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { TextInput, Textarea, Button, Icon } from 'react-materialize'
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

const StyledInput = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: flex-end;
`

const StyledIcon = styled(Icon)`
  color: #5F9EA0;
`

const StyledWargingWrapper = styled.div`
  display: flex;
  margin-top: 10px;
`
const StyledWarning = styled.span`
  color: #5F9EA0;
  padding-left: 7px;
  font-size: 13px;
`

class NewTaskForm extends Component {
  state = {
    title: null,
    description: null,
    assignee: null,
    type: null,
    priority: null,
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
    atLeastOne: false
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
    let stateValues = Object.values(validationObj)
    if ((this.state.client || this.state.houseKeeper) && stateValues.every(value => value !== null)) this.createTask()
    else {
      this.setState({ alertMsg: true })
      for(let key in validationObj) {
        if(validationObj[key] === null ) this.setState({ [`${key}`]: 'error' })
      }
      if(!this.state.client && !this.state.houseKeeper) this.setState({ atLeastOne: true })
    }
  }

  createTask = async () => {
    const { assignee, client, houseKeeper } = this.state
    const task = _.omit(this.state, ['redirect', 'ready', 'date'])
    const coach = this.props.coaches.find(coach => coach.name === assignee)
    task.coach = coach
    task.clientName = client ? client.Name : 'none'
    task.houseKeeperName = houseKeeper ?  houseKeeper.Name : 'none'
    task.office = client ? client.Account.Name : 'none'

    const res = await addTask(task)
    console.log(res);
    await this.props.getTasks()
    this.setState({ ready: true  })
  }
  setUser = (type, data) => {
    let obj = {}
    obj[type] = data
    this.setState({
      ...obj,
      atLeastOne: false
    })
  }

  render() {
    const {
      ready,
      start,
      date,
      alertMsg,
      title,
      description,
      assignee,
      type,
      priority,
      atLeastOne,
      client,
      houseKeeper
     } = this.state
    if (ready ) { return <Redirect to='/ongoing' /> }

    return(
      <div className='task-form'>
        { alertMsg &&
          <Alert
            variant='danger'
            onClose={() => this.setState({ alertMsg: false })}
            dismissible>
            Some fields are missing
          </Alert>
        }
        <h4>New task</h4>
        <StyledInput>
          <TextInput
            label='Title'
            onChange={e => this.handleChange('title', e)}/>
          { title === 'error' && <StyledIcon>error</StyledIcon>}
        </StyledInput>
        <StyledInput>
          <Textarea
            label='Extra info'
            onChange={e => this.handleChange('description', e)} />
          { description === 'error' && <StyledIcon>error</StyledIcon>}
        </StyledInput>
        <StyledInput>
          <TaskDropdown setSelection={ this.handleSelectType }/>
          { type === 'error' && <StyledIcon>error</StyledIcon>}
        </StyledInput>
        <StyledInput>
          <AssigneeDropdown
            coaches={this.props.coaches}
            setSelection={this.handleSelectType}/>
          { assignee === 'error' && <StyledIcon>error</StyledIcon>}
        </StyledInput>
        <StyledInput>
          <PriorityDropdown setSelection={this.handleSelectType}/>
          { priority === 'error' && <StyledIcon>error</StyledIcon>}
        </StyledInput>
        { atLeastOne && (!client || !houseKeeper) &&
          <StyledWargingWrapper>
            <StyledIcon>error</StyledIcon>
            <StyledWarning>Please choose at least a <strong>Client</strong> or <strong>HouseKeeper</strong></StyledWarning>
          </StyledWargingWrapper>
        }
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
