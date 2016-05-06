var React = require('react');
var UserClientActions = require('../actions/user/userClientActions');
var CurrentUserStateMixin = require('../mixins/currentUserState');
var AuthError = require('../mixins/authError');
var hashHistory = require("react-router").hashHistory;

var SignUpForm = require("./signUpForm");

var SignInForm = React.createClass({
  mixins: [CurrentUserStateMixin, AuthError],

  getInitialState: function() {
    return {
      username: "",
      password: "",
      form: "login"
    };
  },

  componentWillUpdate: function() {
    if(this.state.currentUser !== undefined){
      // console.log("hashHistory push to /messages");
      hashHistory.push("/messages");
    }
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
    this.setState({form: "signup"});
    // hashHistory.push("/signup");
  },

  resetForm: function(){
    this.setState({form: "login"});
  },

  getForm: function(){
    if (this.state.form === "login"){
      return(
        <div className="mdl-card signin-card mdl-shadow--2dp">
          <form onSubmit={this.loginUser}>
            <div className="mdl-card__supporting-text">
              <div className="signin-input-box">
            <div className="mdl-textfield mdl-js-textfield">
              <input className="mdl-textfield__input" type="text" pattern="^[a-zA-Z0-9]{1,15}$" id="login-username" onChange={this.changeUsername}
                   value={this.state.username}/>
              <label className="mdl-textfield__label" for="login-username">Username</label>
                <span className="mdl-textfield__error">Letters and numbers only.</span>
           </div>
            <div className="mdl-textfield mdl-js-textfield">
              <input className="mdl-textfield__input" type="password" pattern="^[\S]{8,}$" id="login-password" onChange={this.changePassword}
                 value={this.state.password}/>
               <label className="mdl-textfield__label" for="login-password">Password</label>
                 <span className="mdl-textfield__error">Your password must be at least 8 characters.</span>

              </div>
            </div>
              <div className="mdl-card__actions signin-button-box">
            <input className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored signin-card-button" type="submit" value="Login" />
              <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored signin-card-button" onClick={this.guestLogin}>Guest Login</button>
            </div>
            </div>
          </form>
        </div>
      );
    } else {
      return <SignUpForm reset={this.resetForm} />;
    }
  },

  render: function() {
    // console.log("render signinForm");
    var snackbarContainer = document.querySelector('#error-toast');
    if (this.state.errors.length === 0){
      var errors = "";
    } else{
      snackbarContainer.MaterialSnackbar.showSnackbar({message: this.state.errors.join("\n")});
      // var errors = this.state.errors.map(function(error){
      //   return <h4>{error}</h4>;
      //
      // });
    }

    return (

        <div className="bb-splash">
          <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
            <header className="mdl-layout__header">
              <div className="mdl-layout__header-row">
                <span className="mdl-layout-title">BounceBack</span>
                <div className="mdl-layout-spacer"></div>
                <nav className="mdl-navigation">

                  <a className="mdl-navigation__link" onClick={this.goToSignUp} href="">Sign Up</a>
                  <a className="mdl-navigation__link" href="">Recruiters</a>

                  <a className="mdl-navigation__link" href="">Contact</a>
                </nav>
              </div>
            </header>
            <div className="mdl-layout__content signin-bg">
              <div className="page-content signin-content">
                  {errors}


                  {this.getForm()}

                    <div aria-live="assertive" aria-atomic="true" aria-relevant="text" id="error-toast" className="mdl-snackbar mdl-js-snackbar">
                      <div className="mdl-snackbar__text"></div>
                      <button className="mdl-snackbar__action" type="button"></button>
                    </div>
                  </div>
                </div>
                <footer className="mdl-mini-footer">
                  <div className="mdl-mini-footer__left-section">
                    <div className="mdl-logo">Title</div>
                    <ul className="mdl-mini-footer__link-list">
                      <li><a href="#">Help</a></li>
                      <li><a href="#">Privacy & Terms</a></li>
                    </ul>
                  </div>
                </footer>
              </div>
            </div>

    );
  }

});

module.exports = SignInForm;
