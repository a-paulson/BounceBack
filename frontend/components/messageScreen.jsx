var React = require('react');
var CurrentUserStateMixin = require('../mixins/currentUserState');
var UserClientActions = require("../actions/user/userClientActions");
var HashHistory = require("react-router").hashHistory;

var MessageScreen = React.createClass({
  mixins: [CurrentUserStateMixin],

  componentWillMount: function() {
    if(this.state.currentUser === undefined){
      HashHistory.push("/");
    }
  },

  logout: function(event){
    event.preventDefault();
    UserClientActions.logout();
  },

  render: function() {
    if(this.state.currentUser === undefined){
      HashHistory.push("/");
    }
    return (
      <div>
        <h2>
          {this.state.currentUser.username + " is logged in."}
        </h2>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }

});

module.exports = MessageScreen;
