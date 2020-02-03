import React, { Component } from 'react'
import moment from 'moment'
import { Table } from "react-materialize"

class Logs extends Component {

  renderLogs = () => {
    const { logs } = this.props
    if (logs.length) {
      return logs.map((log, i) => {
        return (
          <tbody key={i}>
            <tr className='table-row'>
              <td>
                Date: { moment(log.sentDate).format('MMMM Do YYYY, h:mm:ss') }
              </td>
              <td>
                From: {log.from}
              </td>
            </tr>
          </tbody>
        )
      })
    } else return (
      <tbody>
        <tr>
          <td>
            No messages
          </td>
        </tr>
      </tbody>)
  }

  render() {
    return(
      <Table>
        {this.renderLogs()}
      </Table>
    )
  }
}

export default Logs;
