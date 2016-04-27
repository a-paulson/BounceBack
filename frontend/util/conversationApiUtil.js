var ConversationApiUtil = {
  fetchConversation: function(conversation){
    $.ajax({
      type:"GET",
      url:"api/conversations/" + conversation.id + "?type=" + conversation.type,
      success: function(answer){
        console.log(answer);
      }
      // error: function(errors){
      //
      // }
    });
  },

  // login: function(user){
  //   $.ajax({
  //     type: "POST",
  //     url: "api/session",
  //     dataType: "json",
  //     data: {user: user},
  //     success: function(currentUser){
  //
  //     },
  //     error: function(errors){
  //
  //     }
  //   });
  // },
  //
  // guestLogin: function(){
  //   $.ajax({
  //     type: "GET",
  //     url: "api/user/guest",
  //     dataType: "json",
  //     success: function(currentUser){
  //
  //     },
  //     error: function(errors){
  //
  //     }
  //   });
  // },
  //
  // logout: function(){
  //   $.ajax({
  //     type: "DELETE",
  //     url: "api/session",
  //     dataType: 'json',
  //     success: function(user){
  //
  //     },
  //     error: function(errors){
  //
  //     }
  //   });
  // },
  //
  // createUser: function(userData){
  //   $.ajax({
  //     type: "POST",
  //     url: "api/user",
  //     dataType: "json",
  //     data: {user: userData},
  //     success: function(user){
  //
  //     },
  //     error: function(errors){
  //
  //     }
  //   });
  // }
};

window.ConversationApiUtil = ConversationApiUtil;

module.exports = ConversationApiUtil;
