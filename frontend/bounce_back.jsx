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
      // <Route path="new-conversation" component={ConversationForm} />
      // <Route path="search-conversations" component={SearchConversations} />
      // <Route path="search-users" component={SearchUsers} />
  </Route>
);

// var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
// var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
// var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
// var is_safari = navigator.userAgent.indexOf("Safari") > -1;
// var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
// if ((is_chrome)&&(is_safari)) { is_safari = false; }
// if ((is_chrome)&&(is_opera)) { is_chrome = false; }
// // console.log("this browser is safari?" + is_safari);
// window.safari_count = 0;


document.addEventListener("DOMContentLoaded", function(){
  if(document.getElementById('content')){
    // console.log(document.getElementById('content').scrollHeight);
  ReactDOM.render(<Router routes={routes} history={hashHistory} />,
  document.getElementById('content'));
  // // console.log("height again");
  // // console.log(document.getElementById('content').scrollHeight);


  // if(is_safari){
  //   setTimeout(function(){
  //     if(window.safari_count < 1){
  //     window.location.reload();
  //     window.safari_count += 1;
  //   }
  //   }, 250);
  // }
}});
