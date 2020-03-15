import React, { Component } from "react"
import { withRouter } from 'react-router-dom'
import { Table, Icon, Button, Pagination } from "react-materialize"
import moment from 'moment'
import ReactExport from "react-export-excel";

import './table.scss'
import Loader from '../loader/Loader'
import FilterStatus from '../dropdowns/FilterStatusDropdown'
import FilterAssigneeDropdown from '../dropdowns/FilterAssigneeDropdown'
import FilterPriority from '../dropdowns/FilterPriority'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class TableTasks extends Component {

  renderTable = () => {
    const {
      list,
      maxItems,
      clearFilters,
      assignee,
      status,
      priority,
      toggleCompleted,
      hideCompleted,
      activePage,
      setActivePage,
      setAssignee,
      setPriority,
      setStatus
     } = this.props;

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
              <FilterStatus setStatus={setStatus} status={status} />
              <FilterAssigneeDropdown setAssignee={setAssignee} assignee={assignee}/>
              <FilterPriority setPriority={setPriority} priority={priority}/>
              <Button className='table-hide-completed'  flat onClick={toggleCompleted}>{ hideCompleted ? 'Show completed / clx' : 'Hide completed / clx'}</Button>
              <Button className='table-clear-filter' onClick={clearFilters}>Clear filters</Button>
              { this.renderExcel() }
            </div>
          </div>
          <br/>
          <Pagination
            activePage={activePage}
            items={maxItems || 8}
            leftBtn={<Icon>chevron_left</Icon>}
            maxButtons={maxItems}
            rightBtn={<Icon>chevron_right</Icon>}
            onSelect={e => setActivePage(e)}
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

  viewTaskDetails = (task) => {
    this.props.history.push({
      pathname: `/task/${task.title}`,
      state: { task }
    })
  }

  renderTaskBody = () => {
    const { taskList, activePage } = this.props
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
