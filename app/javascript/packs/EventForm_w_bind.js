/* Just for Info:
 * Function notation `handleInput() {}` requires binding
 * Function with arrow notation `handleInput = (event) => {}`is explicitly binded
 */
import React, {Component} from 'react';

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      start_datetime: '',
      location: ''
    }
    this.handleInput = this.handleInput.bind(this);
  }
  
  handleInput(event) {
    const name = event.target.name;
    const newState ={};
    newState[name] = event.target.value;
    this.setState(newState);
    console.log(newState);
    event.preventDefault();
  }

  render() { 
    return (  
      <div>
        <h4>Create an Event:</h4>
        <form>
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
