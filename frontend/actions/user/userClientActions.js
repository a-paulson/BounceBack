var UserApiUtil = require("../../util/userApiUtil");

var UserClientActions = {
  fetchCurrenUser: function(){
    UserApiUtil.fetchCurrenUser();
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
};

window.UserClientActions = UserClientActions;

module.exports = UserClientActions;
