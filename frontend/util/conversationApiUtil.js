var ConversationServerActions = require("../actions/conversation/conversationServerActions");

var ConversationApiUtil = {
  fetchConversation: function(id){
    $.ajax({
      type:"GET",
      url:"api/conversations/" + id,
      success: function(conversation){
        ConversationServerActions.receiveConversation(conversation);
      },
      error: function(errors){
        ConversationServerActions.receiveErrors(errors);
      }
    });
  },

  fetchAllConversations: function(){
    $.ajax({
      type:"GET",
      url:"api/conversations",
      success: function(conversations){
        console.log(conversations);
        ConversationServerActions.receiveAllConversations(conversations);
      },
      error: function(errors){
        ConversationServerActions.receiveErrors(errors);
      }
    });
  },

  createConversation: function(newConversation){
    $.ajax({
      type:"POST",
      url:"api/conversations",
      dataType: "json",
      data: {conversation: newConversation},
      success: function(conversation){
        ConversationServerActions.receiveConversation(conversation);
      },
      error: function(errors){
        ConversationServerActions.receiveErrors(errors);
      }
    });
  },

  editConversation: function(conversationUpdate){
    $.ajax({
      type:"PATCH",
      url:"api/conversations/" + conversationUpdate.id,
      dataType: "json",
      data: {conversation: conversationUpdate},
      success: function(conversation){
        ConversationServerActions.receiveConversation(conversation);
      },
      error: function(errors){
        ConversationServerActions.receiveErrors(errors);
      }
    });
  },

  deleteConversation: function(id){
    $.ajax({
      type:"DELETE",
      url:"api/conversations/" + id,
      success: function(){
        ConversationServerActions.removeConversation(id);
      },
      error: function(errors){
        ConversationServerActions.receiveErrors(errors);
      }
    });
  },
};

window.ConversationApiUtil = ConversationApiUtil;

module.exports = ConversationApiUtil;
