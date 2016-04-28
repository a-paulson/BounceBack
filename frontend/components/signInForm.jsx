var React = require('react');
var UserClientActions = require('../actions/user/userClientActions');
var CurrentUserStateMixin = require('../mixins/currentUserState');
var AuthError = require('../mixins/authError');
var hashHistory = require("react-router").hashHistory;

var SignInForm = React.createClass({
  mixins: [CurrentUserStateMixin, AuthError],

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

  guestLogin: function(event){
    event.preventDefault();
    UserClientActions.guestLogin();
  },

  changeUsername: function(event){
    this.setState({username: event.target.value});
  },

  changePassword: function(event){
    this.setState({password: event.target.value});
  },
  
  goToSignUp: function(event){
    event.preventDefault();
    hashHistory.push("/signup");
  },

  render: function() {
    if(this.state.currentUser !== undefined){
      hashHistory.push("/messages");
    }
    if (this.state.errors.length === 0){
      var errors = "";
    } else{
      var errors = this.state.errors.map(function(error){
        return <h4>{error}</h4>;
      });
    }

    return (
      <div>
        {errors}
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
        <button onClick={this.guestLogin}>Login as a Guest</button>
        <button onClick={this.goToSignUp}>Sign Up</button>
      </div>
    );
  }

});

module.exports = SignInForm;
