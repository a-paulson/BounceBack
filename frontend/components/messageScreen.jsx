var React = require('react');
var CurrentUserStateMixin = require('../mixins/currentUserState');
var LogoutMixin = require('../mixins/LogoutMixin');
var UserClientActions = require("../actions/user/userClientActions");
var NavBar = require("./navBar");
var MessagePane = require("./messagePane");
var ConversationIndex = require("./conversationIndex");


var MessageScreen = React.createClass({
  mixins: [CurrentUserStateMixin, LogoutMixin],

  logout: function(event){
    event.preventDefault();
    UserClientActions.logout();
  },

  render: function() {
    console.log("render messageScreen");
    var username = this.state.currentUser ? this.state.currentUser.username : "";
    return (
          <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
            <div className="mdl-layout__drawer">
              <h2>
                {username + " is logged in."}
              </h2>
              <button onClick={this.logout}>Logout</button>
              <span className="mdl-layout-title">Conversation Index</span>
              <nav className="mdl-navigation">
                <button onClick={this.newConversation}>Create a new Conversation</button>
                <ConversationIndex />
              </nav>
            </div>
            <main className="mdl-layout__content">
              <div className="page-content">{this.props.children}</div>
            </main>
          </div>
    );
  }

});

module.exports = MessageScreen;
