import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { TextInput, Textarea, Button, Icon } from 'react-materialize'
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers'
import _ from 'lodash'

import { addTask } from '../../modules/dbQueries'
import ReasonDropdown from '../dropdowns/ReasonDropdown'
import AssigneeDropdown from '../dropdowns/AssigneeDropdown'
import ClientSearch from '../inputs/ClientSearch'
import HKSearch from '../inputs/HKSearch'
import PriorityDropdown from '../dropdowns/PriorityDropdown'
import RequesterInput from '../inputs/RequesterInput'
import WorkingHoursInput from '../inputs/WorkingHoursInput'

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
    title: undefined,
    description: undefined,
    assignee: undefined,
    type: undefined,
    priority: 'low',
    date: undefined,
    start: undefined,
    end: undefined,
    client: undefined,
    houseKeeper: undefined,
    hkFrom: undefined,
    hkUntil: undefined,
    hkWorkingDays: [],
    status: 'not started',
    reqDate: new Date(),
    requester: undefined,
    ready: false,
    redirect: false,
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

  handleSubmit = (e) => {
    e.preventDefault()
    let allGood = this.validation()
    if (allGood) this.createTask()
    else this.props.setError(true)
  }

  validation = () => {
    let valid = false
    let validationObj = _.omit(this.state, ['redirect', 'ready', 'date', 'client', 'houseKeeper', 'atLeastOne', 'reqDate', 'hkWorkingDays', 'hkFrom', 'hkUntil'])
    let requiredValues = Object.values(validationObj)

    if((this.state.client || this.state.houseKeeper) && requiredValues.every(value => (typeof value === 'string' || typeof value === 'object') && value !== 'error')) {
      valid = true
    } else {
      valid = false
      for(let key in validationObj) {
        if(validationObj[key] === undefined || validationObj[key] === '') this.setState({ [`${key}`]: 'error' })
      }
      if(!this.state.client && !this.state.houseKeeper) this.setState({ atLeastOne: true })
    }
    return valid
  }

  createTask = async () => {
    const { assignee, client, houseKeeper } = this.state
    const task = _.omit(this.state, ['redirect', 'ready', 'date', 'atLeastOne'])
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
      title,
      description,
      assignee,
      type,
      priority,
      atLeastOne,
      client,
      houseKeeper,
      requester
     } = this.state
    if (ready ) { return <Redirect to='/ongoing' /> }

    return(
      <div className='task-form'>
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
          <RequesterInput
            coaches={this.props.coaches}
            requester={requester}
            handleSelect={this.handleSelectType}/>
          { requester === 'error' && <StyledIcon>error</StyledIcon>}
        </StyledInput>
        <StyledInput>
          <AssigneeDropdown
            coaches={this.props.coaches}
            setSelection={this.handleSelectType}
            requester={requester}
            />
          { assignee === 'error' && <StyledIcon>error</StyledIcon>}
        </StyledInput>
        <StyledInput>
          <ReasonDropdown setSelection={ this.handleSelectType }/>
          { type === 'error' && <StyledIcon>error</StyledIcon>}
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
        <StyledInput>
          <WorkingHoursInput
            requester={requester}
            coaches={this.props.coaches}
            handleSelect={this.handleSelectType}
            houseKeeper={houseKeeper}
            />
        </StyledInput>
        <div className='task-form-date'>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              className={date ? 'start-visible' : 'start-invisible'}
              label="Selecteer een datum"
              value={date}
              onChange={e => this.setState({ date: e })}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              label="Selecteer een uur"
              ampm={false}
              value={start}
              className={start ? 'start-visible' : 'start-invisible'}
              disabled={!date ? true : false}
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
