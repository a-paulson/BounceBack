var React = require('react');
var UserClientActions = require('../actions/user/userClientActions');
var CurrentUserStateMixin = require('../mixins/currentUserState');
var hashHistory = require("react-router").hashHistory;

var SignInForm = React.createClass({
  mixins: [CurrentUserStateMixin],

  getInitialState: function() {
    return {
      username: "",
      password: ""
    };
  },

  loginUser: function(event){
    event.preventDefault();
    UserClientActions.login({username: this.state.username,
                             password: this.state.password});
    this.setState({username: "", password: ""});
  },

  changeUsername: function(event){
    this.setState({username: event.target.value});
  },

  changePassword: function(event){
    this.setState({password: event.target.value});
  },

  render: function() {
    if(this.state.currentUser !== undefined){
      hashHistory.push("/messages");
    }
    return (
      <div>
        <form onSubmit={this.loginUser}>
          <label>Username
            <input type="text" onChange={this.changeUsername}
               value={this.state.username} />
          </label>
          <br />
          <br />
          <label>Password
            <input type="password" onChange={this.changePassword}
               value={this.state.password} />
          </label>
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }

});

module.exports = SignInForm;
