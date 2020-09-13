import React, {Component} from 'react';
import axios from 'axios'

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      start_datetime: '',
      location: ''
    }
  }
  
  /* Arrow functions use lexical binding, so this function will 
   * automatically bind to the component instance, instead of 
   * defaulting to an undefined context
   */
  handleInput = event =>  {
    const name = event.target.name
    const newState ={}
    newState[name] = event.target.value
    this.setState(newState)
    event.preventDefault()
  }

  handleSubmit = e => {
    axios({
      method: 'POST',
      url: '/events',
      data: {event: this.state},
      headers: {
        'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
      }
    })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
    e.preventDefault()
  }

  render() { 
    return (  
      <div>
        <h4>Create an Event:</h4>
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='title' placeholder='Title' onChange={this.handleInput}/>
          <input type='text' name='start_datetime' placeholder='Date' onChange={this.handleInput}/>
          <input type='text' name='location' placeholder='Location' onChange={this.handleInput}/>
          <button type="submit">Create Event</button>
        </form>
      </div>
    );
  }
}
 
export default EventForm;
