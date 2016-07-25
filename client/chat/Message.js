import React from 'react';

class Message extends React.Component {
  render() {
    return (
      <div className='message-container'>
        <span className='message-author'>{this.props.msg.author}:</span>
        <span class='message-content'>{this.props.msg.content}</span>
      </div>

    )
  }

}

export default Message;