var React = require('react');
var UserClientActions = require('../actions/user/userClientActions');
var hashHistory = require("react-router").hashHistory;
var UserStore = require("../stores/userStore");
var AuthError = require('../mixins/authError');

var SignUpForm = React.createClass({
  mixins: [AuthError],

  getInitialState: function() {
    return {
      username: "",
      fname: "",
      lname: "",
      email: "",
      user_type: "user",
      password: "",
    };
  },

  componentDidMount: function() {
    this.userListener = UserStore.addListener(this.login);
  },

  componentWillUnmount: function() {
    this.userListener.remove();
  },

  login: function(){
    if(UserStore.currentUser() !== undefined){
      hashHistory.push("/messages");
    }
  },

  signUp: function(event){
    event.preventDefault();
      UserClientActions.createUser({username: this.state.username,
                                    fname: this.state.fname,
                                    lname: this.state.lname,
                                    email: this.state.email,
                                    user_type: this.state.user_type,
                                    password: this.state.password});
    //  this.setState({username: "",
    //                 fname: "",
    //                 lanme: "",
    //                 email: "",
    //                 user_type: "",
    //                 password1: "",
    //                 password2: ""});
  },

  changeUsername: function(event){
    this.setState({username: event.target.value});
  },

  changeFname: function(event){
    this.setState({fname: event.target.value});
  },

  changeLname: function(event){
    this.setState({lname: event.target.value});
  },

  changeEmail: function(event){
    this.setState({email: event.target.value});
  },

  changePassword: function(event){
    this.setState({password: event.target.value});
  },

  render: function() {
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
        <form onSubmit={this.signUp}>
          <label>Username
            <input type="text" onChange={this.changeUsername}
               value={this.state.username} />
          </label>
          <br />
          <br />
          <label>First Name
            <input type="text" onChange={this.changeFname}
               value={this.state.fname} />
          </label>
          <label>Last Name
            <input type="text" onChange={this.changeLname}
               value={this.state.lname} />
          </label>
          <br />
          <br />
          <label>Email
            <input type="text" onChange={this.changeEmail}
               value={this.state.email} />
          </label>
          <br />
          <br />
          <label>Password
            <input type="password" onChange={this.changePassword}
               value={this.state.password} />
          </label>
          <p>{this.state.errorText}</p>
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    );
  }

});

module.exports = SignUpForm;
