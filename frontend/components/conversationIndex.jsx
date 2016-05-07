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
    this.setState({conversations: ConversationStore.all()});
    // console.log("onChange in conversation Index");
    // console.log(this.state.conversations);
  },

  // newConversation: function(event){
  //   event.preventDefault();
  //   HashHistory.push("/messages/new-conversation");
  // },

  generateConversationItems: function() {
    var conversations = this.state.conversations;
    if(conversations){
      var self = this;
      return conversations.map(function(conversation){
          return <ConversationIndexItem editConversation={self.props.editConversation} conversation={conversation} key={conversation.id} />;
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
