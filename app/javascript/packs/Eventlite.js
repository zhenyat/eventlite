import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import EventsList from './EventsList'
import EventForm  from './EventForm'
import FormErrors from './FormErrors'

class Eventlite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: this.props.events,
      title: '',
      start_datetime: '',
      location: '',
      formErrors: {},
      formValid: false
    }
  }

  handleInput = e =>  {
    e.preventDefault()
    const name = e.target.name
    const newState ={}
    newState[name] = e.target.value
    this.setState(newState, this.validateForm)
    console.log(this.formValid)
  }

  validateForm() {
    this.setState({
      formValid: 
        this.state.location.length > 0 &&
        this.state.title.length > 2 &&
        Date.parse(this.state.start_datetime) > Date.now()
    })
  }

  handleSubmit = e => {
    let newEvent = {
      title: this.state.title, 
      start_datetime: this.state.start_datetime,
      location: this.state.location
    }
    axios({
      method: 'POST',
      url: '/events',
      data: {event: newEvent},
      headers: {
        'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
      }
    })
    .then(response => {
      console.log(response)
      this.addNewEvent(response.data)
      this.resetFormErrors()
    })
    .catch(error => {
      console.log(error.response.data)
      this.setState({formErrors: error.response.data})
    })
    e.preventDefault()
  }

  addNewEvent = (event) => {
    const events = [event, ...this.state.events].sort(function(a, b) {
      return new Date(a.start_datetime) - new Date(b.start_datetime)
    })
    this.setState({events: events})
  }

  resetFormErrors () {
    this.setState({formErrors: {}})
  }

  render() { 
    return (
      <div>
        <FormErrors formErrors={this.state.formErrors} />
        <EventForm handleSubmit={this.handleSubmit}
          handleInput = {this.handleInput}
          formValid = {this.state.formValid}
          title = {this.state.title}
          start_datetime = {this.state.start_datetime}
          location = {this.state.location}
        />
        <EventsList events={this.state.events} />
      </div>
    )
  }
}
 
document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('events_data')
  const data = JSON.parse(node.getAttribute('data'))
  ReactDOM.render(
    <Eventlite events={data} />,
    document.body.appendChild(document.createElement('div')),
  )
})