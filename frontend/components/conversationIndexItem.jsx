var React = require('react');
var HashHistory = require("react-router").hashHistory;

var ConversationIndexItem = React.createClass({

  handleClick: function(){
    HashHistory.push("/messages/" + this.props.conversation.id);
  },

  render: function() {
    return (
      <li onClick={this.handleClick}>
        <h4>{this.props.conversation.title}</h4>
        <p>{this.props.conversation.description}</p>
      </li>
    );
  }

});

module.exports = ConversationIndexItem;
