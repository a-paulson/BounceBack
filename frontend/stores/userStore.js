var AppDispatcher = require("../dispatcher/dispatcher");
var Store = require("flux/utils").Store;
var UserConstants = require("../constants/userConstants");

var _currentUser = undefined;
var _authErrors = [];

var UserStore = new Store(AppDispatcher);

UserStore.currentUser = function(){
  return _currentUser;
};

UserStore.getErrors = function(){
  return _authErrors.slice();
};

UserStore.processErrors = function(errors){
  _authErrors = [];
  errors.forEach(function(errorObj){
    errorObj.error = errorObj.error.replace("Fname", "First Name");
    errorObj.error = errorObj.error.replace("Lname", "Last Name");
    _authErrors.push(errorObj.error);
  });
};

UserStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case UserConstants.RECEIVE_CURRENT_USER:
      _currentUser = payload.user;
      UserStore.__emitChange();
      break;

    case UserConstants.REMOVE_CURRENT_USER:
      _currentUser = undefined;
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
