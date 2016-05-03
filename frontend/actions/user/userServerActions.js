var UserConstants = require("../../constants/userConstants");
var AppDispatcher = require("../../dispatcher/dispatcher");

var UserServerActions = {
  receiveCurrentUser: function(user){
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVE_CURRENT_USER,
      user: user
    });
  },
  receiveSearchUsers: function(users){
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVE_SEARCH_USERS,
      users: users
    });
  },

  removeCurrentUser: function(user){
    AppDispatcher.dispatch({
      actionType: UserConstants.REMOVE_CURRENT_USER,
    });
  },

  receiveErrors: function(errors){
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVE_ERRORS,
      errors: errors
    });
  }
};

module.exports = UserServerActions;
