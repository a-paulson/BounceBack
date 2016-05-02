var React = require("react"),
    ReactDOM = require("react-dom"),
    ReactRouter = require("react-router"),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    hashHistory = ReactRouter.hashHistory;

var SignInForm = require('./components/signInForm');
var MessageScreen = require('./components/messageScreen');
var SignUpForm = require('./components/signUpForm');
var MessagePane = require("./components/messagePane");
var ConversationForm = require("./components/conversationForm");

var App = React.createClass({
  render: function() {
    console.log("render App")
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

var routes =(
  <Route path="/" component={App}>
    <IndexRoute component={MessageScreen} />
      <Route path=":conversationId/edit" component={ConversationForm} />
      <Route path=":conversationId" component={MessagePane} />
      <Route path="new-conversation" component={ConversationForm} />
    <Route path="signup" component={SignUpForm} />
  </Route>
);

document.addEventListener("DOMContentLoaded", function(){
  ReactDOM.render(<Router routes={routes} history={hashHistory} />,
  document.getElementById('content'));
});
