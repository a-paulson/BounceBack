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
    return (
      <div>
        <p>Message Index</p>
        <ul>
          {this.getMessageItems()}
        </ul>
      </div>
    );
  }

});

module.exports = MessageIndex;
