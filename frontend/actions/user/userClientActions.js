var UserApiUtil = require("../../util/userApiUtil");

var UserClientActions = {
  fetchCurrentUser: function(){
    UserApiUtil.fetchCurrentUser();
  },

  login: function(user){
    UserApiUtil.login(user);
  },

  guestLogin: function(){
    UserApiUtil.guestLogin();
  },

  logout: function(){
    UserApiUtil.logout();
  },

  createUser: function(userData){
    UserApiUtil.createUser(userData);
  },

  fetchSearchUsers: function(){
    UserApiUtil.fetchSearchUsers();
  },
};

window.UserClientActions = UserClientActions;

module.exports = UserClientActions;
