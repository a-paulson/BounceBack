var React = require('react');
var HashHistory = require("react-router").hashHistory;
var UserStore = require("../stores/userStore");
var ConversationClientActions = require("../actions/conversation/conversationClientActions");

var ConversationIndexItem = React.createClass({

  handleClick: function(){
    HashHistory.push("/messages/" + this.props.conversation.id);
  },

  manipulateConversation: function() {
    if(UserStore.currentUser().username === this.props.conversation.owner){
      return(
        <div>
          <button onClick={this.deleteConversation}>
            Delete Conversation
          </button>
          <button onClick={this.editConversation}>Edit Conversation</button>
        </div>
      );
    } else{
      return null;
    }
  },

  deleteConversation: function(event){
    event.preventDefault();
    ConversationClientActions.deleteConversation(this.props.conversation.id);
  },

  editConversation: function(event){
    event.preventDefault();
    HashHistory.push("/messages/" + this.props.conversation.id + "/edit");
  },

  render: function() {
    var conversation = this.props.conversation;
      return (
        <li onClick={this.handleClick}>
          <h4>{conversation.title}</h4>
          <p>{conversation.description}</p>
          {this.manipulateConversation()}
        </li>
      );
  }

});

module.exports = ConversationIndexItem;
