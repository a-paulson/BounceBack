var React = require('react');
var CurrentUserStateMixin = require('../mixins/currentUserState');
var UserClientActions = require("../actions/user/userClientActions");

var MessageScreen = React.createClass({
  mixins: [CurrentUserStateMixin],

  logout: function(event){
    event.preventDefault();
    UserClientActions.logout();
  },

  render: function() {
    var username = this.state.currentUser ? this.state.currentUser.username : "";
    return (
      <div>
        <h2>
          {username + " is logged in."}
        </h2>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }

});

module.exports = MessageScreen;
