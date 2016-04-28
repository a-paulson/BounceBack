var React = require('react');
var ConversationIndex = require("./conversationIndex");

var NavBar = React.createClass({

  render: function() {
    return (
      <div className="NavBar">
        <p>NavBar</p>
        <ConversationIndex />
      </div>
    );
  }

});

module.exports = NavBar;
