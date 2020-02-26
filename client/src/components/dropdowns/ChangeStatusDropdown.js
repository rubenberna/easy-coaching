import React, { Component } from 'react'
import { Select, Textarea, Button } from 'react-materialize'
import styled from 'styled-components'

const StyledTextArea = styled.div`
  width: 510px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

class ChangeStatusDropdown extends Component {
  state = {
    status: '',
    showCxlReason: false,
    cxlReason: ''
  }

  actionHandler = async (e) => {
    await this.setState({ status: e.target.value })
    if (this.state.status === 'cancelled') this.setState({ showCxlReason: true })
    else this.submitChange()
  }

  submitChange = () => {
    const { task, changeStatus } = this.props
    const { status, cxlReason } = this.state
    task.status = status
    task.cxlReason = cxlReason
    changeStatus(task)
  }

  renderCxlReasonInput = () => {
    return (
      <StyledTextArea>
        <Textarea label="Please enter a cancellation reason" onChange={e => this.setState({ cxlReason: e.target.value })}/>
        <Button onClick={this.submitChange}>Submit</Button>
      </StyledTextArea>
    )
  }

  render() {
    let { status, showCxlReason } = this.state
    return(
      <div className='change-status-dropdown'>
        <Select value={status} onChange={this.actionHandler} >
          <option value="" disabled defaultValue>
            Change status
          </option>
          <option value="not started">
            Not started
          </option>
          <option value="planned">
            Planned
          </option>
          <option value="feedback call">
            Feedback call
          </option>
          <option value="completed">
            Completed
          </option>
          <option value="cancelled">
            Cancelled
          </option>
        </Select>
        {
          showCxlReason && this.renderCxlReasonInput()
        }
      </div>
    )
  }
}

export default ChangeStatusDropdown;
