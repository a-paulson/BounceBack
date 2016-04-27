var UserServerActions = require("../actions/user/userServerActions");

var UserApiUtil = {
  fetchCurrenUser: function(){
    $.ajax({
      type:"GET",
      url:"api/user",
      success: function(user){
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

  logout: function(){
    $.ajax({
      type: "DELETE",
      url: "api/session",
      dataType: 'json',
      success: function(user){
        UserServerActions.removeCurrentUser();
      },
      error: function(errors){
        UserServerActions.receiveErrors(errors.responseJSON);
      }
    });
  },

  createUser: function(userData){
    $.ajax({
      type: "POST",
      url: "api/session",
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
