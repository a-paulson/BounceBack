var ConversationConstants = require("../../constants/conversationConstants");
var AppDispatcher = require("../../dispatcher/dispatcher");

var ConversationServerActions = {
  receiveConversation: function(conversation){
    AppDispatcher.dispatch({
      actionType: ConversationConstants.RECEIVE_CONVERSATION,
      conversation: conversation
    });
  },

  receiveAllConversations: function(conversations){
    AppDispatcher.dispatch({
      actionType: ConversationConstants.RECEIVE_ALL_CONVERSATIONS,
      conversations: conversations
    });
  },

  removeConversation: function(conversation){
    AppDispatcher.dispatch({
      actionType: ConversationConstants.REMOVE_CONVERSATION,
      conversation: conversation
    });
  },

  receiveErrors: function(errors){
    AppDispatcher.dispatch({
      actionType: ConversationConstants.RECEIVE_ERRORS,
      errors: errors
    });
  }
};

module.exports = ConversationServerActions;
