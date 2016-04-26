var UserApiUtil = require("../../util/userApiUtil");

var UserClientActions = {
  fetchCurrenUser: function(){
    UserApiUtil.fetchCurrenUser();
  },

  login: function(user){
    UserApiUtil.login(user);
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
