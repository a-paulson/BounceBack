var React = require('react');
var HashHistory = require("react-router").hashHistory;
var UserStore = require("../stores/userStore");
var ConversationClientActions = require("../actions/conversation/conversationClientActions");

var ConversationIndexItem = React.createClass({

  handleClick: function(event){
    event.preventDefault();
    HashHistory.push("/messages/" + this.props.conversation.id);
  },

  manipulateConversation: function() {
    if(UserStore.currentUser().user === this.props.conversation.owner){
      return(
        <div className="conversation-button-box">
          <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored conversation-button"
            onClick={this.deleteConversation}>
            Delete Conversation
          </button>
          <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored conversation-button"
            onClick={this.editConversation}>Edit Conversation</button>
        </div>
      );
    } else{
      return(
        <div className="conversation-button-box">
          <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored unsubscribe-button"
          onClick={this.unsubscribe}>unsubscribe</button>
        </div>
      );
    }
  },

  deleteConversation: function(event){
    event.preventDefault();
    ConversationClientActions.deleteConversation(this.props.conversation.id);
  },

  editConversation: function(event){
    event.preventDefault();
    // debugger;
    console.log("messages/" + this.props.conversation.id + "/edit");
    HashHistory.push("messages/" + this.props.conversation.id + "/edit");
    // HashHistory.push("/");
  },

  unsubscribe: function(event){
    event.preventDefault();
    ConversationClientActions.unsubscribeFromConversation(this.props.conversation.id);
    ConversationClientActions.fetchSearchConversations();
  },

  render: function() {
    var conversation = this.props.conversation;
      return (
        <div>
          <a className="mdl-navigation__link" onClick={this.handleClick} href="">
            <h5>{conversation.title}</h5>
            <p>{conversation.description}</p>
          </a>
          {this.manipulateConversation()}
        </div>
      );
  }

});

module.exports = ConversationIndexItem;
