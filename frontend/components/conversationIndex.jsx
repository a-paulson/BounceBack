var React = require('react');
var HashHistory = require('react-router').hashHistory;
var ConversationIndexItem = require("./conversationIndexItem");
var ConversationStore = require("../stores/conversationStore");
var ConversationClientActions = require('../actions/conversation/conversationClientActions');

var ConversationIndex = React.createClass({

  getInitialState: function() {
    return {
      conversations: ConversationStore.all()
    };
  },

  componentDidMount: function() {
    this.conversationListener = ConversationStore.addListener(this._onChange);
    ConversationClientActions.fetchAllConversations();
  },

  componentWillUnmount: function() {
    this.conversationListener.remove();
  },

  _onChange: function() {
    this.setState({conversations: ConversationStore.all()});
  },

  newConversation: function(event){
    event.preventDefault();
    HashHistory.push("/messages/new-conversation");
  },

  generateConversationItems: function() {
    var conversations = this.state.conversations;
    if(conversations){
      return conversations.map(function(conversation){
          return <ConversationIndexItem conversation={conversation} key={conversation.id} />;
      });
    } else{
      return [];
    }
  },

  render: function() {
    console.log("render ConversationIndex");
    return (
      <div>
        {this.generateConversationItems()}
      </div>
    );
  }

});

module.exports = ConversationIndex;
