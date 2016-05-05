var AppDispatcher = require("../dispatcher/dispatcher");
var Store = require("flux/utils").Store;
var ConversationConstants = require("../constants/conversationConstants");

var _conversations = {};
var _searchConversations = [];
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

ConversationStore.searchConversations = function(){
  // return $.extend({}, _conversations);
  // var conversations = [];
  // Object.keys(_searchConversations).forEach(function(key){
  //   conversations.push(_searchConversations[key]);
  // });
  var conversations = _searchConversations.slice();
  return conversations;
};

ConversationStore.find = function(id){
  return _conversations[id];
};

ConversationStore.getErrors = function(){
  return _conversationErrors.slice();
};

ConversationStore.processAllConversations = function(conversations){
  Object.keys(conversations).forEach(function(key){
    if(_conversations[key] === undefined){
      _conversations[key] = conversations[key];
    }
  });
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
      ConversationStore.processAllConversations(payload.conversations);
      ConversationStore.__emitChange();
      break;

    case ConversationConstants.RECEIVE_SEARCH_CONVERSATIONS:
      _searchConversations = payload.conversations;
      console.log(payload.conversations);
      ConversationStore.__emitChange();
      break;

    case ConversationConstants.REMOVE_CONVERSATION:
      var test = _conversations;
      delete _conversations[payload.conversation];
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
