var ConversationApiUtil = require("../../util/conversationApiUtil");

var ConversationClientActions = {
  fetchConversation: function(id){
    ConversationApiUtil.fetchConversation(id);
  },

  fetchAllConversations: function(){
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
};

window.ConversationClientActions = ConversationClientActions;

module.exports = ConversationClientActions;
