var React = require('react');
var MessageIndexItem = require("./messageIndexItem");

var MessageIndex = React.createClass({

  getMessageItems: function() {
    var messages = this.props.messages;
    if (messages){
      return messages.map(function(message){
          return <MessageIndexItem message={message} key={message.id} />;
      });
    } else{
      return [];
    }
  },

  render: function() {
    console.log("render messageIndex");
    return (
      <div className="message-index">
        <p>Message Index</p>
          {this.getMessageItems()}
      </div>
    );
  }

});

module.exports = MessageIndex;
