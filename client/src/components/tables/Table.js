import React, { Component } from "react"
import { withRouter } from 'react-router-dom'
import { Table, Icon, Button } from "react-materialize"
import moment from 'moment'
import ReactExport from "react-export-excel";

import './table.scss'
import Loader from '../loader/Loader'
import { pokeDev } from '../../modules/poke'
import FilterStatus from '../dropdowns/FilterStatusDropdown'
import PriorityDropdown from '../dropdowns/PriorityDropdown'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const initialState = {
  status: '',
  priority: '',
  hideCompleted: true
}

class TableTasks extends Component {

  state = initialState

  renderTable = () => {
    const { list } = this.props;
    const { status, priority, hideCompleted } = this.state
    if (!list) return <Loader/>
    else {
      return(
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
            <FilterStatus setFilter={this.setFilter} status={status} />
            <PriorityDropdown setSelection={this.setFilter} priority={priority} namedClass={"filter-dropdown"}/>
            <Button className='table-hide-completed'  flat onClick={e => this.setState({ hideCompleted: !this.state.hideCompleted })}>{ hideCompleted ? 'Show completed' : 'Hide completed'}</Button>
            <Button className='table-clear-filter' onClick={e => this.clearFilters()}>Clear</Button>
            { this.renderExcel() }
          </div>
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
          <ExcelColumn label="Status" value="status" />
          <ExcelColumn label="Requested" value="reqDate" />
          <ExcelColumn label="Start" value="start" />
          <ExcelColumn label="End" value="end" />
          <ExcelColumn label="Client" value="clientName" />
          <ExcelColumn label="HouseKeeper" value="houseKeeperName" />
          <ExcelColumn label="Office" value="office" />
          <ExcelColumn label="Priority" value="priority" />
        </ExcelSheet>
      </ExcelFile>
    )
  }

  setFilter = (filter) => {
    this.setState({...filter})
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

  renderTaskBody = () => {
    let taskList = []
    const { list } = this.props
    const { status, priority, hideCompleted } = this.state

    if (status && priority) taskList = list.filter(task => task.status === status && task.priority === priority)
    else if (status && !priority) taskList = list.filter(task => task.status === status)
    else if (!status && priority) taskList = list.filter(task => task.priority === priority)
    else if (hideCompleted) taskList = list.filter(task => task.status !== 'completed')
    else if (!hideCompleted) taskList = list.filter(task => task.status === 'completed')
    else taskList = list

    return taskList.map((task, index) => {
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
            <td style={{ textTransform: 'capitalize' }} onClick={ e => this.viewTaskDetails(task) }>
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
