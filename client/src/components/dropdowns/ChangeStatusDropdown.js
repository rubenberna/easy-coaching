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

  actionHandler = (e) => {
    this.setState({ status: e.target.value })
    const { task, changeStatus } = this.props
    task.status = e.target.value
    task.cxlReason = this.state.cxlReason
    if (task.status === 'cancelled') this.setState({ showCxlReason: true })
    else this.submitChange(task)
  }

  renderCxlReasonInput = () => {
    return (
      <StyledTextArea>
        <Textarea label="Please enter a cancellation reason" onChange={e => this.setState({ cxlReason: e.target.value })}/>
        <Button>Submit</Button>
      </StyledTextArea>
    )
  }

  submitChange = task => this.props.changeStatus(task)

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
