var React = require("react"),
    ReactDOM = require("react-dom"),
    ReactRouter = require("react-router"),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    hashHistory = ReactRouter.hashHistory;

var App = React.createClass({
  render: function() {
    return (
      <div>
        <h2>App</h2>
        {this.props.children}
      </div>
    );
  }
});

var routes =(
  <Route path="/" component={App}>

  </Route>
);

document.addEventListener("DOMContentLoaded", function(){
  ReactDOM.render(<Router routes={routes} history={hashHistory} />,
  document.getElementById('content'));
});
