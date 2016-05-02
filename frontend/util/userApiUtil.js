var UserServerActions = require("../actions/user/userServerActions");

var UserApiUtil = {
  fetchCurrentUser: function(){
    $.ajax({
      type:"GET",
      url:"api/user",
      success: function(user){
        console.log("userApiUtil success on fetchCurrentUser");
        UserServerActions.receiveCurrentUser(user);
      },
      error: function(errors){
        UserServerActions.receiveErrors(errors.responseJSON);
      }
    });
  },

  login: function(user){
    $.ajax({
      type: "POST",
      url: "api/session",
      dataType: "json",
      data: {user: user},
      success: function(currentUser){
        UserServerActions.receiveCurrentUser(currentUser);
      },
      error: function(errors){
        UserServerActions.receiveErrors(errors.responseJSON);
      }
    });
  },

  guestLogin: function(){
    $.ajax({
      type: "GET",
      url: "api/user/guest",
      dataType: "json",
      success: function(currentUser){
        UserServerActions.receiveCurrentUser(currentUser);
      },
      error: function(errors){
        UserServerActions.receiveErrors(errors.responseJSON);
      }
    });
  },

  logout: function(){
    $.ajax({
      type: "DELETE",
      url: "api/session",
      dataType: 'json',
      success: function(user){
        UserServerActions.removeCurrentUser();
      },
      error: function(errors){
        location.reload();
        // UserServerActions.receiveErrors(errors.responseJSON);
      }
    });
  },

  createUser: function(userData){
    $.ajax({
      type: "POST",
      url: "api/user",
      dataType: "json",
      data: {user: userData},
      success: function(user){
        UserServerActions.receiveCurrentUser(user);
      },
      error: function(errors){
        UserServerActions.receiveErrors(errors.responseJSON);
      }
    });
  },
};

module.exports = UserApiUtil;
