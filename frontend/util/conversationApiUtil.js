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
    console.log("AHHHHHH " + id);
    $.ajax({
      type:"DELETE",
      url:"api/conversations/" + id,
      success: function(conversation){
        console.log(conversation);
        ConversationServerActions.removeConversation(conversation.id);
      },
      error: function(errors){
        console.log(errors);
        ConversationServerActions.receiveErrors(errors);
      }
    });
  },

  subscribeToConversation: function(id){
    $.ajax({
      type:"POST",
      url:"api/conversation_users",
      dataType: "json",
      data: {conversation_user: {conversation_id: id}},
      success: function(conversation){
        ConversationServerActions.receiveConversation(conversation);
      },
      error: function(errors){
        ConversationServerActions.receiveErrors(errors);
      }
    });
  },

  unsubscribeFromConversation: function(id){
    $.ajax({
      type:"DELETE",
      url:"api/conversation_users",
      dataType: "json",
      data: {conversation_user: {conversation_id: id}},
      success: function(conversation){
        ConversationServerActions.removeConversation(conversation.id);
      },
      error: function(errors){
        ConversationServerActions.receiveErrors(errors);
      }
    });
  },

  submitMessage: function(message){
    $.ajax({
      type:"POST",
      url:"api/messages",
      dataType: "json",
      data: {message: message},
      success: function(conversation){
        ConversationServerActions.receiveConversation(conversation);
      },
      error: function(errors){
        ConversationServerActions.receiveErrors(errors);
      }
    });
  }
};

window.ConversationApiUtil = ConversationApiUtil;

module.exports = ConversationApiUtil;
