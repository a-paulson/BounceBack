var AppDispatcher = require("../dispatcher/dispatcher");
var Store = require("flux/utils").Store;
var UserConstants = require("../constants/userConstants");

var _currentUser = undefined;
var _authErrors = [];
var _searchUsers = {};

var UserStore = new Store(AppDispatcher);

UserStore.currentUser = function(){
  if(_currentUser){
    return _currentUser;
  }
  else {
    _currentUser = {user: window.sessionStorage.getItem("user")};
    return _currentUser;
  }
};

UserStore.getErrors = function(){
  return _authErrors.slice();
};

UserStore.getSearchUsers = function(){
  var users = [];
  Object.keys(_searchUsers).forEach(function(key){
    users.push(_searchUsers[key]);
  });
  return users;
};

UserStore.processErrors = function(errors){
  _authErrors = [];
  errors.forEach(function(errorObj){
    errorObj.error = errorObj.error.replace("Fname", "First Name");
    errorObj.error = errorObj.error.replace("Lname", "Last Name");
    _authErrors.push(errorObj.error);
  });
};

UserStore.setCurrentUser = function(user){
  console.log(user);
  _currentUser = {user: user.username};
  window.sessionStorage.setItem("user", user.username);
};

UserStore.setSearchUsers = function(users){
  _searchUsers = users;
};

UserStore.removeCurrentUser = function(){
  _currentUser = undefined;
  window.sessionStorage.removeItem("user");
};

UserStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case UserConstants.RECEIVE_CURRENT_USER:
      UserStore.setCurrentUser(payload.user);
      UserStore.__emitChange();
      break;

    case UserConstants.RECEIVE_SEARCH_USERS:
      UserStore.setSearchUsers(payload.users);
      UserStore.__emitChange();
      break;

    case UserConstants.REMOVE_CURRENT_USER:
      UserStore.removeCurrentUser();
      UserStore.__emitChange();
      break;

    case UserConstants.RECEIVE_ERRORS:
      UserStore.processErrors(payload.errors);
      UserStore.__emitChange();
      break;
  }
};

window.UserStore = UserStore;

module.exports = UserStore;
