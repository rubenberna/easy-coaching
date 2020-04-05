import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import { TextInput, Textarea, Button } from 'react-materialize'
import { CirclePicker } from 'react-color'
import { AuthContext} from '../../connectors/auth/Auth'

import { editCoach, getCoaches } from '../../services/dbQueries'

class EditCoach extends Component {

  state = {
    name: this.props.coach.name,
    email: this.props.coach.email,
    intro: this.props.coach.intro,
    img: null,
    role: this.props.coach.role,
    started: this.props.coach.started,
    calendarColor: '#fff',
    id: this.props.coach.id,
    photo: this.props.coach.photo,
    tooBig: false
  }

  static contextType = AuthContext

  handleChange = (name, e) => {
    let change = {}
    let inputValue = e.target.value
    change[name] = inputValue
    this.setState({ ...change })
  }

  handleChangeColor = (color, event) => {
    this.setState({ calendarColor: color.hex });
  }

  handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file.size > 1000000 ) this.setState({ tooBig: true })
    else this.setState({ img: file })
  }

  renderFileIsTooBig = () => {
    if (this.state.tooBig) return <p className='file-too-big'>Your file is too big (1MB limit)</p>
  }

  renderClearFileBtn = () => {
    if (this.state.photo || this.state.tooBig) return (
      <Button flat onClick={ e => this.setState({ photo: null, tooBig: false }) }>clear</Button>
    )
  }

  handleSubmit = async () => {
    const coach = _.omit(this.state, 'tooBig')
    await editCoach(coach)
    const coaches = await getCoaches()
    this.context.dispatchCoaches({
      type: 'SET_COACHES',
      payload: coaches
    })
    this.props.history.push('/')
  }

  render() {
    const { name,
      email,
      intro,
      role,
      started,
      calendarColor
    } = this.state

    return(
      <div className='edit-coach-form'>
        <h3>Edit Coach form</h3>
        <TextInput label="Name" value={name} onChange={e => this.handleChange('name', e)}/>
        <TextInput label="Start date" type='date' value={started} onChange={e => this.handleChange('started', e)}/>
        <Textarea label="Introduction" value={intro} onChange={e => this.handleChange('intro', e)}/>
        <TextInput label="Role" value={role} onChange={e => this.handleChange('role', e)}/>
        <TextInput
          email
          label="Email"
          value={email}
          validate
          onChange={e => this.handleChange('email', e)}
        />
        <label>Select calendar color</label>
        <CirclePicker color={this.state.calendarColor} value={calendarColor} onChangeComplete={this.handleChangeColor}/>
        <input type="file" id="file-uploader" aria-label="File browser example" onChange={e => this.handleFileUpload(e) }/>
        <label htmlFor="file-uploader">Upload photo</label>
        { this.state.photo && <span>{this.state.photo.name}</span> }
        { this.renderClearFileBtn() }
        { this.renderFileIsTooBig() }
        <div>
          <Button
            waves="light"
            style={{marginRight: '5px', background: '#009688', color: '#FFF'}}
            onClick={ this.handleSubmit }>
            Update
          </Button>
        </div>
      </div>
    )
  }
}

export default withRouter(EditCoach);
