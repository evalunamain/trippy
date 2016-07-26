import React from 'react';
import Message from './Message';
import uuid from 'uuid';

class Chat extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      text: '',
      typing: false,
    };

  }
  componentDidMount() {
    const socket = this.props.socket;
    
    socket.on('new message', msg => {
      this.props.addMessage(msg);
    });
  }

   handleChange(e) {
    const socket = this.props.socket;

    this.setState({ text: e.target.value });
    if (e.target.value.length > 0 && !this.state.typing) {
      socket.emit('author typing', this.props.author.id);
      this.setState({ typing: true});
    }
    if (e.target.value.length === 0 && this.state.typing) {
      socket.emit('author stop typing', this.props.author.id);
      this.setState({ typing: false});
    }
  }

  handleSendMessage(e) {
    e.preventDefault();
    const socket = this.props.socket;
    const author = this.props.author.name;
    const content = this.refs.message.value;
    const timestamp = Date.now();
    const msg = { author, content, timestamp, id: uuid.v4() };
    this.props.sendMessage(msg);
    socket.emit('new message', msg);
    socket.emit('author stop typing', this.props.author.id);

    //Prefer single quotes but have to assign value with "";
    this.refs.message.value = "";
  }

  render() {
    const messages = this.props.messages
      .map(msg => <Message key={msg.id} msg={msg} />);
    return (
      <div className="chat-inner-container">
				<div className="messages-container">
          {messages}
        </div>
				<form ref="chatForm" onSubmit={this.handleSendMessage.bind(this)} className='chat-form'>
					<input type="text" ref="message" placeholder="Message" className='chat-input' onChange={this.handleChange.bind(this)}/>
					<input type="submit" className='chat-button'/>
				</form>
			</div>
    );
  }

}

export default Chat;
