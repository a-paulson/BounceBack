var React = require("react"),
    ReactDOM = require("react-dom"),
    ReactRouter = require("react-router"),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    hashHistory = ReactRouter.hashHistory;

var MessageScreen = require('./components/messageScreen');
var MessagePane = require("./components/messagePane");
var ConversationForm = require("./components/conversationForm");
var SearchConversations = require("./components/searchConversations");
var SearchUsers = require("./components/searchUsers");

var routes =(
  <Route path="/" component={MessageScreen}>
      <Route path="messages/:conversationId/edit" component={ConversationForm} />
      <Route path="messages/:conversationId" component={MessagePane} />
      <Route path="new-conversation" component={ConversationForm} />
      <Route path="search-conversations" component={SearchConversations} />
      <Route path="search-users" component={SearchUsers} />
  </Route>
);

document.addEventListener("DOMContentLoaded", function(){
  ReactDOM.render(<Router routes={routes} history={hashHistory} />,
  document.getElementById('content'));
});
