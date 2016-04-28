var React = require('react');
var MessageIndex = require("./messageIndex");
var MessageForm = require("./messageForm");
var ConversationStore = require("../stores/conversationStore");
var ConversationClientActions = require('../actions/conversation/conversationClientActions');

var MessagePane = React.createClass({

  getInitialState: function() {
    return {
      conversation: ConversationStore.find(parseInt(this.props.params.conversationId))
    };
  },

  componentDidMount: function() {
    this.conversationListener = ConversationStore.addListener(this._onChange);
    ConversationClientActions.fetchConversation(parseInt(this.props.params.conversationId));
    // console.log("cdm");
  },

  componentWillUnmount: function() {
    this.conversationListener.remove();
    // console.log("cwum");
  },

  componentWillReceiveProps: function(nextProps) {
    console.log(nextProps);
    ConversationClientActions.fetchConversation(parseInt(nextProps.params.conversationId));
    // console.log("cwrp");
  },

  _onChange: function() {
    this.setState({conversation: ConversationStore.find(parseInt(this.props.params.conversationId))});
    // this.forceUpdate();
    // console.log("onChange");
  },


  render: function() {
    var messages = this.state.conversation ? this.state.conversation.messages : undefined;
    // console.log("running rensder: " + messages);
    return (
      <div className="MessagePane">
        <p>MessagePane</p>
        <MessageIndex messages={messages}/>
        <MessageForm conversationId={this.props.params.conversationId}/>
      </div>
    );
  }

});

module.exports = MessagePane;
