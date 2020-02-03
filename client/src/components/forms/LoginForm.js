import React, { Component } from 'react'
import { TextInput, Button } from 'react-materialize'

class LoginForm extends Component {
  state = {
    email: null,
    password: null,
    incomplete: false
  }

  handleChange = (name, e) => {
    let change = {}
    let inputValue = e.target.value
    change[name] = inputValue
    this.setState({ ...change })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { email, password } = this.state
    if ( !email || !password ) this.setState({ incomplete: true  })
    else return this.props.validate(this.state)
  }

  render() {
    return(
      <div className='login-form'>
        <TextInput label='email' type='email' className='validate' onChange={e => this.handleChange('email', e)} />
        <TextInput label='password' type='password' onChange={e => this.handleChange('password', e)} />
        <Button
          waves="light"
          flat
          style={{marginRight: '5px'}}
          onClick={ this.handleSubmit }>
          Login
        </Button>
        { !this.state.incomplete || <p style={{ color: 'red', fontSize: '12px' }}>Please enter all fields</p>}
      </div>
    )
  }
}

export default LoginForm;
