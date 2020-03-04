import React, { Component } from "react"
import { withRouter } from 'react-router-dom'
import { Table, Icon, Button, Pagination } from "react-materialize"
import moment from 'moment'
import _ from 'lodash'
import ReactExport from "react-export-excel";

import './table.scss'
import Loader from '../loader/Loader'
import { pokeDev } from '../../modules/poke'
import FilterStatus from '../dropdowns/FilterStatusDropdown'
import FilterAssigneeDropdown from '../dropdowns/FilterAssigneeDropdown'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const initialState = {
  status: undefined,
  assignee: undefined,
  hideCompleted: true,
  activePage: 1,
  max: 3
}

class TableTasks extends Component {

  state = {
    status: undefined,
    assignee: undefined,
    hideCompleted: true,
    activePage: 1,
    max: 3
  }

  renderTable = () => {
    const { list, coaches, setFilter } = this.props;
    const { status, hideCompleted, assignee, activePage, max } = this.state
    if (!list) return <Loader/>
    else {
      return(
        <div>
          <div className='table-board'>
            <Table className='highlight'>
              <thead>
                <tr>
                  <th data-field="title">Title</th>
                  <th data-field="dev">Assigned to</th>
                  <th data-field="status">Status</th>
                  <th data-field="date">Scheduled</th>
                  <th data-field="priority">Priority</th>
                  <th data-field="date">Requested</th>
                </tr>
              </thead>
              { this.renderTaskBody() }
            </Table>
            <div className='table-board-filters'>
              <h6>FILTERS</h6>
              <FilterStatus setFilter={setFilter} status={status} />
              <FilterAssigneeDropdown setFilter={setFilter} coaches={coaches} assignee={assignee}/>
              <Button className='table-hide-completed'  flat onClick={e => this.setState({ hideCompleted: !this.state.hideCompleted })}>{ hideCompleted ? 'Show completed / clx' : 'Hide completed / clx'}</Button>
              <Button className='table-clear-filter' onClick={e => this.clearFilters()}>Clear filters</Button>
              { this.renderExcel() }
            </div>
          </div>
          <br/>
          <Pagination
            activePage={activePage}
            items={Math.floor(list.length / 10)}
            leftBtn={<Icon>chevron_left</Icon>}
            maxButtons={Math.floor(list.length / 10)}
            rightBtn={<Icon>chevron_right</Icon>}
            onSelect={e => this.setState({ activePage: e })}
          />
        </div>
      )
    }
  }

  renderExcel = () => {
    const { list } = this.props
    return (
      <ExcelFile element={<Button className='excel-btn'>Export to excel</Button>} filename='TaskList'>
        <ExcelSheet data={list} name="TaskList">
          <ExcelColumn label="Title" value="title" />
          <ExcelColumn label="Reason" value="type" />
          <ExcelColumn label="Assignee" value="assignee" />
          <ExcelColumn label="Requester" value="requester" />
          <ExcelColumn label="Status" value="status" />
          <ExcelColumn label="Requested" value="reqDate" />
          <ExcelColumn label="Start" value="start" />
          <ExcelColumn label="End" value="end" />
          <ExcelColumn label="Client" value="clientName" />
          <ExcelColumn label="HouseKeeper" value="houseKeeperName" />
          <ExcelColumn label="Office" value="office" />
          <ExcelColumn label="Priority" value="priority" />
          <ExcelColumn label="Cancellation reason" value="cxlReason" />
        </ExcelSheet>
      </ExcelFile>
    )
  }

  setFilter = (filter) => {
    this.setState({...filter})
    let filters = _.omit(this.state, ['hideCompleted', ''])
    this.props.changeTaskList(this.state)
  }

  clearFilters = () => {
    this.setState(initialState)
  }

  viewTaskDetails = (task) => {
    this.props.history.push({
      pathname: `/task/${task.title}`,
      state: { task }
    })
  }

  poke = (index, task) => {
    this.setState({[`index${index}`]: 'poked' })
    pokeDev(task)
  }

  renderIcon = (index, task) => {
    let position = `index${index}`
    if (this.state[position] === 'poked') return <Icon className='stop'>notifications_off</Icon>
    else return <div onClick={e => this.poke(index, task)}><Icon className='intermitent'>notifications_active</Icon></div>
  }

  setMaxPaginationItems = length => {
    this.setState({ max: Math.floor(length / 10) })
  }

  renderTaskBody = () => {
    const { list } = this.props
    let taskList = []

    const { status, assignee, hideCompleted, activePage } = this.state

    if (status && assignee) taskList = list.filter(task => task.status === status && task.assignee === assignee)
    else if (status && !assignee) taskList = list.filter(task => task.status === status)
    else if (!status && assignee) taskList = list.filter(task => task.assignee === assignee)
    else if (hideCompleted) taskList = list.filter(task => task.status !== 'completed' && task.status !== 'cancelled')
    else if (!hideCompleted) taskList = list.filter(task => task.status === 'completed' || task.status === 'cancelled')
    else taskList = list

    // this.setMaxPaginationItems(taskList.length)
    let start = (activePage - 1) * 10
    let end = start + 10

    return taskList.slice(start, end).map((task, index) => {
      return (
        <tbody key={index} style={{ cursor: 'pointer' }}>
          <tr className='table-row'>
            <td onClick={ e => this.viewTaskDetails(task) }>
              { task.title }
            </td>
            <td onClick={ e => this.viewTaskDetails(task) }>
              { task.assignee || '' }
            </td>
            <td className={`${task.status} table-status-td`}>
              { task.status }
            </td>
            <td onClick={ e => this.viewTaskDetails(task) }>
              { moment(task.start).format("MMM Do,  h:mm a")  || '' }
            </td>
            <td className={task.priority} onClick={ e => this.viewTaskDetails(task) }>
              { task.priority }
            </td>
            <td onClick={ e => this.viewTaskDetails(task) }>
            { moment(task.reqDate).format("MMM Do")  || '' }
            </td>
            <td>
              { this.renderIcon(index, task) }
            </td>
          </tr>
        </tbody>
      )}
    )
  }

  render() {
    return (
      <>
        { this.renderTable() }
      </>
    );
  }
}

export default withRouter(TableTasks);
