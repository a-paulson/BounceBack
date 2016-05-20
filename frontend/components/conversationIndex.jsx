var React = require('react');
var HashHistory = require('react-router').hashHistory;
var ConversationIndexItem = require("./conversationIndexItem");
var ConversationStore = require("../stores/conversationStore");
var UserStore = require("../stores/userStore");
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


      this.pusher = new Pusher("5846484f93e7e696b493", {
        encrypted: true
      });

      var self = this;

      var channel = this.pusher.subscribe('user_' + UserStore.currentUser().user);
      channel.bind('new_conversation', function(data) {
        // console.log("pusher event triggered");
        ConversationClientActions.fetchAllConversations();
        // console.log("fetch sent");
      });
      // // console.log("cdm");

  },

  componentWillUnmount: function() {
    this.conversationListener.remove();
  },

  _onChange: function() {
    var lastConversation = this.state.conversations[this.state.conversations.length - 1]
    this.setState({conversations: ConversationStore.all()});
    var newLastConversation = this.state.conversations[this.state.conversations.length - 1]
    if (lastConversation && newLastConversation && lastConversation.id !== newLastConversation.id){
      HashHistory.push("messages/" + newLastConversation.id);
    }

    var currentConversation = document.getElementById('current-conversation');
    if (currentConversation){
      currentConversation.scrollIntoView();
      // console.log("SCROLL");
    }

    // console.log("onChange in conversation Index");
    // console.log(this.state.conversations);
  },

  // newConversation: function(event){
  //   event.preventDefault();
  //   HashHistory.push("/messages/new-conversation");
  // },

  generateConversationItems: function() {
    var conversations = this.state.conversations;
    var currentConversationId = window.location.hash.match(/\/messages\/\d+/);
    if(currentConversationId){
      currentConversationId = parseInt(currentConversationId[0].match(/\d+/)[0]);
    }
    if(conversations){
      var self = this;
      return conversations.map(function(conversation){
        return <ConversationIndexItem
          editConversation={self.props.editConversation}
          conversation={conversation} key={conversation.id}
          current={conversation.id === currentConversationId ? 1 : 0} />;
      });
    } else{
      return [];
    }
  },

  render: function() {
    // console.log("render ConversationIndex");
    return (
      <div>
        <h4 className="conversation-header">Conversations</h4>
        {this.generateConversationItems()}
      </div>
    );
  }

});

module.exports = ConversationIndex;
