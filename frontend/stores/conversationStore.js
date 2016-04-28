var AppDispatcher = require("../dispatcher/dispatcher");
var Store = require("flux/utils").Store;
var ConversationConstants = require("../constants/conversationConstants");

var _conversations = {};
var _conversationErrors = [];

var ConversationStore = new Store(AppDispatcher);

ConversationStore.all = function(){
  // return $.extend({}, _conversations);
  var conversations = [];
  Object.keys(_conversations).forEach(function(key){
    conversations.push(_conversations[key]);
  });
  return conversations;
};

ConversationStore.find = function(id){
  return _conversations[id];
};

ConversationStore.getErrors = function(){
  return _conversationErrors.slice();
};

ConversationStore.processErrors = function(errors){
  _conversationErrors = [];
  errors.forEach(function(errorObj){
    _conversationErrors.push(errorObj.error);
  });
};

ConversationStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case ConversationConstants.RECEIVE_CONVERSATION:
      var id = payload.conversation.id;
      _conversations[id] = payload.conversation;
      ConversationStore.__emitChange();
      break;

    case ConversationConstants.RECEIVE_ALL_CONVERSATIONS:
      _conversations = payload.conversations;
      ConversationStore.__emitChange();
      break;

    case ConversationConstants.REMOVE_CONVERSATION:
      delete _conversations[payload.id];
      ConversationStore.__emitChange();
      break;

    case ConversationConstants.RECEIVE_ERRORS:
      ConversationStore.processErrors(payload.errors);
      ConversationStore.__emitChange();
      break;
  }
};

window.ConversationStore = ConversationStore;

module.exports = ConversationStore;
