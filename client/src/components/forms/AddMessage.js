import React, { Component } from 'react'
import { Button, Textarea, TextInput, Icon } from 'react-materialize'

class AddMessage extends Component {

  state = {
    sendTo: this.props.sendTo,
    from: this.props.from,
    title: this.props.task.title,
    taskDate: this.props.task.reqDate,
    id: this.props.task.id,
    file: '',
    msg: '',
    tooBig: false,
    inputKey: Date.now(),
    disabled: false
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.sendMessage(this.state)
    this.setState({ disabled: true })
    this.props.fetchLogs()
  }

  handleFileUpload = (e) => {
    const file = e.target.files[0]
    this.setState({ file: file })
    if (file.size > 1000000 ) this.setState({ tooBig: true })
  }

  renderFileIsTooBig = () => {
    if (this.state.tooBig) return <p className='file-too-big'>Your file is too big (1MB limit)</p>
  }

  renderClearFileBtn = () => {
    if (this.state.file) return (
      <Button flat onClick={ e => this.setState({ file: '', tooBig: false, inputKey: Date.now() }) }>clear</Button>
    )
  }

  render() {
    const { disabled, inputKey, msg, tooBig } = this.state

    return(
      <form
        className='add-message'
        disabled={ disabled }
        onSubmit={ this.handleSubmit }>
      <div>
        From:
        <p>{this.props.from}</p>
        To:
        <p>{this.props.sendTo}</p>
        <div className='add-message-text'>
          <Icon>mode_edit</Icon>
          <Textarea
            onChange={e => this.setState({ msg: e.target.value })}
            disabled={ disabled }
          />
        </div>
      </div>
        <div className='add-message-send'>
          <div className='add-message-send-with-error'>
            <div className='add-message-send-file'>
              <TextInput type='file' key={ inputKey } label='upload' onChange={e => this.handleFileUpload(e) } />
              { this.renderClearFileBtn() }
            </div>
            { this.renderFileIsTooBig() }
          </div>
          { msg && !tooBig && <Button>Send</Button>}
        </div>
      </form>
    )
  }
}

export default AddMessage;
