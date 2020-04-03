import React, { Component } from 'react';
import _ from 'lodash'
import { TextInput, Textarea, Button } from 'react-materialize'
import { CirclePicker } from 'react-color'
import Loader from '../../loader/Loader'

class NewCoach extends Component {
  state = {
    name: null,
    email: null,
    intro: null,
    password: null,
    photo: null,
    role: null,
    started: null,
    calendarColor: '#fff',
    admin: false,
    tooBig: false
  }

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
    if (file.size > 1000000) this.setState({ tooBig: true })
    else this.setState({ photo: file })
  }

  renderFileIsTooBig = () => {
    if (this.state.tooBig) return <p className='file-too-big'>Your file is too big (1MB limit)</p>
  }

  renderClearFileBtn = () => {
    if (this.state.photo || this.state.tooBig) return (
      <Button flat onClick={e => this.setState({ photo: null, tooBig: false })}>clear</Button>
    )
  }

  handleSubmit = async () => {
    const coach = _.omit(this.state, 'tooBig')
    this.props.createCoach(coach)
  }

  renderSubmitButton = () => {
    const coach = _.omit(this.state, 'tooBig')
    let array = Object.values(coach)
    let incomplete = array.some(value => { return value === null })
    if (!incomplete && !this.state.tooBig) return (
      <Button
        waves="light"
        style={{ marginRight: '5px', background: '#009688', color: '#FFF' }}
        onClick={this.handleSubmit}>
        Create
      </Button>
    )
  }

  renderForm = () => (
    <div className='new-coach-form container'>
      <h3>New Coach form</h3>
      <TextInput label="Name" onChange={e => this.handleChange('name', e)} />
      <TextInput label="Start date" type='date' onChange={e => this.handleChange('started', e)} />
      <Textarea label="Introduction" onChange={e => this.handleChange('intro', e)} />
      <TextInput label="Role" onChange={e => this.handleChange('role', e)} />
      <TextInput
        email
        label="Email"
        validate
        onChange={e => this.handleChange('email', e)}
      />
      <TextInput label="Password" type='password' onChange={e => this.handleChange('password', e)} />
      <label>Select calendar color</label>
      <CirclePicker color={this.state.calendarColor} onChangeComplete={this.handleChangeColor} />
      <input type="file" id="file-uploader" aria-label="File browser example" onChange={e => this.handleFileUpload(e)} />
      <label htmlFor="file-uploader">Upload photo</label>
      {this.state.photo && <span>{this.state.photo.name}</span>}
      {this.renderClearFileBtn()}
      {this.renderFileIsTooBig()}
      <div>
        {this.renderSubmitButton()}
        {this.props.loading && <Loader />}
      </div>
    </div>
  )

  render() {
    return this.renderForm()
  }
}

export default NewCoach
