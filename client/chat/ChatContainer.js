import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as chatActions  from '../ducks/messagesDuck';
import Paper from 'material-ui/Paper';
import Chat from './Chat';

class ChatContainer extends React.Component {
  render() {
    return (
      <Paper zDepth={2} rounded={false} className='chat-container'>
        <Chat  {...this.props}/>
      </Paper>
    );
  }
}

const mapStateToProps = state => Object.assign({}, { author:state.author, messages: state.messages });

const mapDispatchToProps = dispatch => bindActionCreators({ ...chatActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);

