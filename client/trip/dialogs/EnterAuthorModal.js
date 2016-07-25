import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { isEqual, omit } from 'lodash';
import { setAuthor } from '../../ducks/authorDuck';

let uuid = require('uuid');

class EnterAuthorModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
      buttonDisabled: true,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const propsChanged = (!isEqual(nextProps, this.props));
    const somethingBesidesFormValuesChanged = (
      !isEqual(_.omit(nextState, 'value'), _.omit(this.state, 'value'))
    );
    return (propsChanged || somethingBesidesFormValuesChanged);
  }

  handleChange(e, value) {
    this.setState({ buttonDisabled: (value === '') });
    this.setState({ value: value });
  }

  handleSubmit(e) {
    const { dispatch } = this.props;
    e.preventDefault();
    const socket = this.props.socket;
    const name = this.state.value;
    const id = uuid.v4();
    const author = { name, id };
    dispatch(setAuthor(author));
    this.setState({ open: false });
    socket.emit('new author', author);
  }

  render() {
    const title = 'Let your friends know who you are!';
    const disabled = this.state.buttonDisabled;
    const actions = [
        <FlatButton
          label="Submit"
          primary={true}
          disabled={disabled}
          onTouchTap={this.handleSubmit.bind(this)}
        />
    ];
    const textStyle = {
      'marginLeft': '10px',
    }

    return (
      <Dialog
        title={title}
        actions={actions}
        modal={true}
        open={this.state.open}
      >
        <form onSubmit={(e) => this.handleSubmit(e) } >
          <label>Enter your name:</label>
          <TextField autoFocus={true} style={textStyle} id="name" onChange={this.handleChange.bind(this)} />
        </form>
      </Dialog>
    );
  }
}

export default connect()(EnterAuthorModal);