var React = require('react');
var MessageIndex = require("./messageIndex");
var MessageForm = require("./messageForm");
var ConversationStore = require("../stores/conversationStore");
var ConversationClientActions =
  require('../actions/conversation/conversationClientActions');

var MessagePane = React.createClass({

  getInitialState: function() {
    return {
      conversation: ConversationStore.find(
        parseInt(this.props.params.conversationId))
    };
  },

  componentDidMount: function() {
    this.conversationListener = ConversationStore.addListener(this._onChange);
    this.pusher = new Pusher('5846484f93e7e696b493', {
      encrypted: true
    });

    var self = this;

    var channel = this.pusher.subscribe('conversation_' +
      this.props.params.conversationId);
    channel.bind('new_message', function(data) {
      ConversationClientActions.fetchConversation(
        parseInt(self.props.params.conversationId));
    });

    ConversationClientActions.fetchConversation(
      parseInt(this.props.params.conversationId));
    // console.log("cdm");
  },

  componentWillUnmount: function() {
    this.conversationListener.remove();
    this.pusher.unsubscribe('conversation_' +
      this.props.params.conversationId);
    // console.log("cwum" );
  },

  componentWillReceiveProps: function(nextProps) {
    console.log(nextProps);
    ConversationClientActions.fetchConversation(
      parseInt(nextProps.params.conversationId));
    // console.log("cwrp");
  },

  _onChange: function() {
    this.setState({conversation: ConversationStore.find(
      parseInt(this.props.params.conversationId))});
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