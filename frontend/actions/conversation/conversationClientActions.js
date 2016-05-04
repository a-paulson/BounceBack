var ConversationApiUtil = require("../../util/conversationApiUtil");

var ConversationClientActions = {
  fetchConversation: function(id){
    ConversationApiUtil.fetchConversation(id);
  },

  fetchAllConversations: function(){
    console.log("fetchAllConversations");
    ConversationApiUtil.fetchAllConversations();
  },

  createConversation: function(conversation){
    ConversationApiUtil.createConversation(conversation);
  },

  editConversation: function(conversation){
    ConversationApiUtil.editConversation(conversation);
  },

  deleteConversation: function(id){
    ConversationApiUtil.deleteConversation(id);
  },

  subscribeToConversation: function(id){
    ConversationApiUtil.subscribeToConversation(id);
  },

  unsubscribeFromConversation: function(id){
    ConversationApiUtil.unsubscribeFromConversation(id);
  },

  submitMessage: function(message){
    ConversationApiUtil.submitMessage(message);
  },

  fetchSearchConversations: function(){
    ConversationApiUtil.fetchSearchConversations();
  },

  createDirectMessage: function(DMData){
    ConversationApiUtil.createDirectMessage(DMData);
  },
};

window.ConversationClientActions = ConversationClientActions;

module.exports = ConversationClientActions;
