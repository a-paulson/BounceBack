var React = require('react');
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

  generateConversationItems: function() {
    var conversations = this.state.conversations;
    // debugger;
    if(conversations){
      return conversations.map(function(conversation){
          return <ConversationIndexItem conversation={conversation} key={conversation.id} />;
      });
    } else{
      return [];
    }
  },

  render: function() {
    return (
      <div>
        <p>Conversation Index</p>
        <ul>
          {this.generateConversationItems()}
        </ul>
      </div>
    );
  }

});

module.exports = ConversationIndex;
