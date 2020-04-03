import React, { Component } from 'react'
import { RadioGroup, Button } from 'react-materialize'
import { AuthContext } from '../../connectors/auth/Auth'

class RadioButtons extends Component {
  state = {
    assignee: null
  }

  static contextType = AuthContext

  handleChange = (e) => {
    this.setState({ assignee: e.target.value })
  }

  handleSubmit = (e) => {
    this.props.assign(this.state.assignee)
  }

  coachesList = () => {
    let { coaches } = this.context
    if(coaches) {
      let list = coaches.map(c => {
        let cObj = {}
        cObj['label'] = c.name
        cObj['value'] = c.name
        return cObj
      })
      return list
    }
  }

  render() {
    const { assignee } = this.state

    return(
      <div className='radio-btn-form'>
        <RadioGroup
          name="coaches"
          withGap
          label="Coaches"
          value={assignee}
          onChange={ e => this.handleChange(e) }
          options={this.coachesList()}
          />
          <Button flat waves="light" onClick={ this.handleSubmit } >
            Reassign
          </Button>
      </div>
    )
  }
}

export default RadioButtons;
