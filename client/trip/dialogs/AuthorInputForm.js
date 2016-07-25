import React from 'react';
import TextField from 'material-ui/TextField';

class AuthorInputForm extends React.Component {

  handleChange(e) {
    e.preventDefault();
    const value = this.refs.name.value;
  }

  render() {
    return (
      <div>
        <label>Enter your name:</label>
        <input type='text' ref='name' onBlur={this.handleChange.bind(this)} />
      </div>
    );
  }
}

export default AuthorInputForm;