var React = require('react');
var ConversationClientActions = require('../actions/conversation/conversationClientActions');

var Icon = require('react-mdl').Icon;

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
    // console.log("MessageForm render");
    // <input id="message-submit-button" type="Submit" value="Submit" />
    return (
      <div id="message-form">
        <form onSubmit={this.submitMessage} className="mdl-card message-form-card">
          <input id="message-body-input" type="textarea" onChange={this.changeBody} value={this.state.body} />
            <button type="submit" id="message-submit-button" className="mdl-button mdl-js-button mdl-button--fab subscription-button">
              <Icon name="add_box" />
            </button>
            </form>
      </div>
    );
  }

});

module.exports = MessageForm;
