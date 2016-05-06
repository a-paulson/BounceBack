var React = require('react');
var UserClientActions = require('../actions/user/userClientActions');
var hashHistory = require("react-router").hashHistory;
var UserStore = require("../stores/userStore");
var AuthError = require('../mixins/authError');
var Select = require("react-select");

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
      displayedOption: "user"
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

  changeUserType: function(val, option){
    // console.log(val);
    this.setState({user_type: val.value, displayedOption: val.value});
    // console.log(this.state);
  },

  selectOptions: [{value: "user", label: "Jobseeker"},
    {value: "recruiter", label: "Recruiter"}
  ],

  render: function() {
    var errors = "";
    // if (this.state.errors.length === 0){
    //   errors = "";
    // } else{
    //   errors = this.state.errors.map(function(error){
    //     return <h4>{error}</h4>;
    //   });
    // }
    return (

      <div className="mdl-card signup-card mdl-shadow--2dp">
        {errors}
        <form onSubmit={this.signUp}>
          <div className="mdl-card__supporting-text">
            <div className="signin-signup-box">
          <div className="mdl-textfield mdl-js-textfield">
            <input className="mdl-textfield__input" type="text" pattern="^[a-zA-Z0-9]{1,15}$" id="login-username" onChange={this.changeUsername}
               value={this.state.username}/>
           <label className="mdl-textfield__label" for="login-username">Username</label>
             <span className="mdl-textfield__error">Letters and numbers only.</span>

         </div>
          <div className="mdl-textfield mdl-js-textfield">
            <input className="mdl-textfield__input" type="text" pattern="^[A-Za-z ,.'-]+$" id="login-fname" onChange={this.changeFname}
               value={this.state.fname}/>
             <label className="mdl-textfield__label" for="login-fname">First Name</label>
               <span className="mdl-textfield__error">Invalid Character</span>
         </div>
          <div className="mdl-textfield mdl-js-textfield">
            <input className="mdl-textfield__input" type="text" pattern="^[A-Za-z ,.'-]+$" id="login-lname" onChange={this.changeLname}
               value={this.state.lname}/>
             <label className="mdl-textfield__label" for="login-lname">Last Name</label>
               <span className="mdl-textfield__error">Invalid Character</span>
         </div>
          <div className="mdl-textfield mdl-js-textfield">
            <input className="mdl-textfield__input" type="text" pattern="/^(([a-zA-Z]|[0-9])|([-]|[_]|[.]))+[@](([a-zA-Z0-9])|([-])){2,63}[.](([a-zA-Z0-9]){2,63})+$/gi" id="login-email" onChange={this.changeEmail}
               value={this.state.email}/>
             <label className="mdl-textfield__label" for="login-email">Email</label>
             <span className="mdl-textfield__error">Invalid Email</span>
         </div>
          <div className="mdl-textfield mdl-js-textfield">
            <input className="mdl-textfield__input" pattern="^[\S]{8,}$" type="password" id="login-password" onChange={this.changePassword}
               value={this.state.password}/>
             <label className="mdl-textfield__label" for="login-password">Password</label>
               <span className="mdl-textfield__error">Your password must be at least 8 characters.</span>
            </div>
          </div>
            <div className="mdl-card__actions signin-button-box">
          <input className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored signin-card-button" type="submit" value="Sign Up" />
            <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored signin-card-button" onClick={this.props.reset}>Go Back</button>
          </div>
          </div>
        </form>
      </div>
    );
  }

});

module.exports = SignUpForm;
