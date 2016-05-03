var React = require('react');
var UserStore = require('../stores/userStore');
var UserClientActions = require("../actions/user/userClientActions");
var MessagePane = require("./messagePane");
var ConversationIndex = require("./conversationIndex");
var HashHistory = require('react-router').hashHistory;


var MessageScreen = React.createClass({
  getInitialState: function(){
    console.log("initial state");
    console.log(UserStore.currentUser());

    return {currentUser: UserStore.currentUser()};
  },


  componentDidMount: function(){
    this.userListener = UserStore.addListener(this.updateUser);
    console.log("messagePane");
    console.log(UserStore.currentUser());
    UserClientActions.fetchCurrentUser();
    if(UserStore.currentUser() === undefined || UserStore.currentUser() === null)
    {
      console.log("client Action fetch currentUser");
      UserClientActions.fetchCurrentUser();
    }
  },

  componentWillUnmount: function() {
    this.userListener.remove();
  },

  updateUser: function(){
    this.setState({currentUser: UserStore.currentUser()});
  },

  logout: function(event){
    event.preventDefault();
    UserClientActions.logout();
  },

  newConversation: function(event){
    event.preventDefault();
    HashHistory.push("new-conversation");
  },

  searchConversations: function(event){
    event.preventDefault();
    HashHistory.push("search-conversations");
  },

  searchUsers: function(event){
    event.preventDefault();
    HashHistory.push("search-users");
  },

  render: function() {
    console.log("render messageScreen");
    console.log(this.state.currentUser);
    console.log(this.props.children);
    var username = this.state.currentUser ? this.state.currentUser.user : "";
    return (
          <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
            <div className="mdl-layout__drawer">
                  <h3><i className="material-icons md-36">&#xE853;</i>{username}</h3>
              <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored side-nav-button"
                onClick={this.logout}>Logout</button>
              <span className="mdl-layout-title">Conversations</span>
              <nav className="mdl-navigation">
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored side-nav-button"
                  onClick={this.newConversation}>Create a new Conversation</button>
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored side-nav-button"
                  onClick={this.searchConversations}>Search Conversations</button>
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored side-nav-button"
                  onClick={this.searchUsers}>Search Users</button>
                <br></br>
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
