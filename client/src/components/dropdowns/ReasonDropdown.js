import React, { Component } from 'react'
import { Select } from 'react-materialize'

class ReasonDropdown extends Component {
  state = { type: ''}

  actionHandler = (e) => {
    this.setState({ type: e.target.value })
    this.props.setSelection({ type: e.target.value })
  }

  render () {
    let {type} = this.state
    return(
      <>
        <Select
          value={type}
          onChange={this.actionHandler}
          >
          <option value="" disabled defaultValue>
            Reason
          </option>
          <option value="op vraag van klant">
            Op vraag van klant
          </option>
          <option value="op vraag van kantoor">
            Op vraag van kantoor
          </option>
          <option value="op vraag van HHH">
            Op vraag van HHH
          </option>
          <option value="nps-score">
            NPS-score
          </option>
          <option value="schadegeval">
            Schadegeval
          </option>
          <option value="starter">
            Starter
          </option>
          <option value="op initiatief van coach">
            Op initiatief van coach
          </option>
        </Select>
      </>
    )
  }
}

export default ReasonDropdown;
