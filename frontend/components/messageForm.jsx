var React = require('react');
var ConversationClientActions = require('../actions/conversation/conversationClientActions');

var MessageForm = React.createClass({

  getInitialState: function() {
    return {
      body: ""
    };
  },

  submitMessage: function(event){
    event.preventDefault();
    ConversationClientActions.submitMessage({body: this.state.body,
      conversation_id: this.props.conversationId});
    this.setState({body: ""});
  },

  changeBody: function(event){
    this.setState({body: event.target.value});
  },

  render: function() {
    console.log("MessageForm render");
    return (
      <div>
        <form onSubmit={this.submitMessage}>
          <input type="textarea" onChange={this.changeBody} value={this.state.body} />
          <input type="Submit" value="Submit" />
        </form>
      </div>
    );
  }

});

module.exports = MessageForm;
