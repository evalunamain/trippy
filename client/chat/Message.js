import React from 'react';

class Message extends React.Component {
  render() {
    return (
      <div>
        <strong>{this.props.msg.author}:</strong> {this.props.msg.content}
      </div>

    )
  }

}

export default Message;