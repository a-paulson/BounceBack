var AppDispatcher = require("../dispatcher/dispatcher");
var Store = require("flux/utils").Store;
var UserConstants = require("../constants/userConstants");

var _currentUser = null;
var _authErrors = [];

var UserStore = new Store(AppDispatcher);

UserStore.currentUser = function(){
  return _currentUser;
};

UserStore.authErrors = function(){
  return _authErrors.slice();
};


UserStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case UserConstants:
      // _benches = payload.benches;
      UserStore.__emitChange();
      break;
  }

};
