import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class CreateTrip extends React.Component {
  getElement() {
    if (this.props.createState.editing) {
      return < CreateForm { ...this.props } />;
    }
    return  < CreateButton { ...this.props } />;
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

class CreateButton extends React.Component {
  toggleInputField(editing) {
    setTimeout(() => {
      this.props.toggleCreateState(editing);
    }, 250);
  }

  render () {
    return (
      < RaisedButton
        label='Create a trip'
        className="trip-button"
        onClick={() => this.toggleInputField(true)}
      />
    )
  }
}

class CreateForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { title: '' };
  }

  handleChange(e, title) {
    this.setState({ title: title });
  }

  handleSubmit(e) {
    e.preventDefault();
    const title = this.state.title;
    if (!title) return;
    this.props.createTrip(title);
  }

  render() {
    const style = {
      'margin': '15px 10px 15px 50px',
    }

    return (
      <form onSubmit={(e) => this.handleSubmit(e) }>
        <TextField
          onChange={this.handleChange.bind(this)}
          hintText="Enter a name"
          name="name"
          style={style}
        />
      </form>
    );
  }
}


export default CreateTrip;