import React from 'react';
import { browserHistory } from 'react-router';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class JoinTrip extends React.Component {
  getElement() {
    if (this.props.joinState.editing) {
      return < JoinForm { ...this.props } />;
    }
    return  < JoinButton { ...this.props } />;
  }

  render() {
    const element = this.getElement();
    return (
      <div>
        {element}
      </div>
    );
  }
}

class JoinButton extends React.Component {
  toggleInputField(editing) {
    setTimeout(() => {
      this.props.toggleJoinState(editing);
    }, 250);
  }

  render () {
    return (
      < RaisedButton
        label='Join a trip'
        className="trip-button"
        onClick={() => this.toggleInputField(true)}
      />
    )
  }
}

class JoinForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { id: '' };
  }

  handleChange(e, id) {
    this.setState({ id: id });
  }

  handleJoinTrip(e) {
    e.preventDefault();
    const tripId = this.state.id;
    if (!tripId) return;
    browserHistory.push(tripId);
  }

  render() {
    const style = {
      'margin': '15px 10px 15px 50px',
    }

    return (
      <form onSubmit={(e) => this.handleJoinTrip(e) }>
        <TextField
          onChange={this.handleChange.bind(this)}
          hintText="Enter trip ID"
          name="id"
          style={style}
        />
      </form>
    );
  }
}

export default JoinTrip;