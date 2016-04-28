var React = require('react');

var MessageIndexItem = React.createClass({

  render: function() {
    return (
      <li>
        <p>{this.props.message.body}</p>
        <p>{"By: " + this.props.message.author}</p>
      </li>
    );
  }

});

module.exports = MessageIndexItem;
