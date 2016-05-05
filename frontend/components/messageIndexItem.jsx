var React = require('react');


var MessageIndexItem = React.createClass({

  render: function() {
    return (
      <div className="mdl-card message-card">
        <div className="mdl-card__supporting-text message-body">{this.props.message.body}</div>
        <div className="mdl-card__supporting-text message-author">{"By: " + this.props.message.author}</div>
      </div>
    );
  }

});

module.exports = MessageIndexItem;
