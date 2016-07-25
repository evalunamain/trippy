import React from 'react';
import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';

class EntryForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleCreateClick(e) {
    e.preventDefault();
    this.props.createTrip();
  }

  render() {
    return (
      <div>
        <div>
         <button onClick={this.handleCreateClick.bind(this)} >Create a new trip</button>
        </div>
        <div>Or</div>
        <form>
          <label>Join an exisiting one:</label>
          <input type='text' ref='tripID' placeholder='Trip ID' />
          <input type='submit' text='Join!' />
        </form>
      </div>
    );
  }
}

export default EntryForm;
