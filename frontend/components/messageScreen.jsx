var React = require('react');
var UserStore = require('../stores/userStore');
var ConversationStore = require('../stores/conversationStore');
var UserClientActions = require("../actions/user/userClientActions");
var MessagePane = require("./messagePane");
var ConversationIndex = require("./conversationIndex");
var HashHistory = require('react-router').hashHistory;

var ConversationForm = require("./conversationForm");
var SearchConversations = require("./searchConversations");
var SearchUsers = require("./searchUsers");


var Icon = require('react-mdl').Icon;


var MessageScreen = React.createClass({
  getInitialState: function(){
    // console.log("initial state");
    // console.log(UserStore.currentUser());

    return {currentUser: UserStore.currentUser(),
            child: "none",
            conversationId: undefined};
  },


  componentDidMount: function(){
    this.userListener = UserStore.addListener(this.updateUser);
    // console.log("messagePane");
    // console.log(UserStore.currentUser());
    UserClientActions.fetchCurrentUser();
    if(UserStore.currentUser() === undefined || UserStore.currentUser() === null)
    {
      // console.log("client Action fetch currentUser");
      UserClientActions.fetchCurrentUser();
    }


    this.conversationListener = ConversationStore.addListener(this.switchConversation);
  },

  componentWillUnmount: function() {
    this.userListener.remove();
    this.conversationListener.remove();
  },

  switchConversation: function(){
    if(this.state.nextConversation){
      HashHistory.push("messages/" + this.state.nextConversation);
      this.setState({nextConversation: undefined});
    }
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
    // HashHistory.push("new-conversation");
    this.setState({child: "new-conversation", conversationId: undefined});
  },

  editConversation: function(conversationId){
    this.setState({child: "new-conversation", conversationId: conversationId});
  },

  searchConversations: function(event){
    // console.log("serachConversations clicked");
    event.preventDefault();
    // HashHistory.push("search-conversations");
    this.setState({child: "search-conversations", conversationId: undefined});
  },

  searchUsers: function(event){
    event.preventDefault();
    // HashHistory.push("search-users");
    this.setState({child: "search-users", conversationId: undefined});
  },

  resetNavBar: function(event, nextConversation){
    event.preventDefault();
    if(nextConversation){
      this.setState({child: "none", conversationId: undefined, nextConversation: nextConversation});
    }
    else{
      this.setState({child: "none", conversationId: undefined});
    }
  },

  render: function() {
    // console.log("render messageScreen");
    // console.log(this.state.currentUser);
    // console.log(this.props.children);
    var username = this.state.currentUser ? this.state.currentUser.user : "";

    var child =  null;

    switch (this.state.child) {
      case "new-conversation":
        child = (
          <div className="left-nav-subsection">
            <button className="mdl-button mdl-js-button mdl-button--raised side-nav-button"
              onClick={this.resetNavBar}>
              Close
            </button>
            <ConversationForm conversationId={this.state.conversationId} onFinish={this.resetNavBar}/>
          </div>
        );
        break;

      case "search-conversations":
        child = (
          <div className="left-nav-subsection">
            <button className="mdl-button mdl-js-button mdl-button--raised side-nav-button"
              onClick={this.resetNavBar}>
              Close
            </button>
            <SearchConversations onFinish={this.resetNavBar} />
          </div>
        );
        break;

      case "search-users":
        child = (
          <div className="left-nav-subsection">
            <button className="mdl-button mdl-js-button mdl-button--raised side-nav-button"
              onClick={this.resetNavBar}>
              Close
            </button>
            <SearchUsers onFinish={this.resetNavBar} />
          </div>
        );
        break;

      default:
      child = null;
    }

    // console.log(child);
    // <h1>Welcome to BounceBack</h1>

    var directions = (
      <div className="instructions-holder">
        <div className="instructions mdl-card message-card internal-text">
            <img alt="BounceBack Logo" className="logo internal-logo" src="/bb_internal_logo.svg" width="126" height="102" />
            <h3>
               Jump start your job search today by chatting with recruiters, career coaches and other applicants.
             </h3><h3>
               Get started by choosing a conversation on the right.
             </h3><h3>
               Don't see anything you like?
               Use the options on the left to message a user, find a new conversation or create your own.
             </h3><h3>
               Congratulations on taking the first step towards a new career.
             </h3>
        </div>
      </div>


    );

    var displayChildren = this.props.children ? this.props.children : directions;



    return (
      <div>
          <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
            <div className="mdl-layout__drawer sidebar-recolor">
              <div className="username-div">
              <h3 className="username">{username}</h3><Icon name="account_circle" className="user-icon"/>
              </div>
              <button className="mdl-button mdl-js-button mdl-button--raised side-nav-button"
                onClick={this.logout}>Logout</button>
              <nav className="mdl-navigation left-nav-navigation">
                <button className="mdl-button mdl-js-button mdl-button--raised side-nav-button"
                  onClick={this.newConversation}>New Conversation</button>
                <button className="mdl-button mdl-js-button mdl-button--raised side-nav-button"
                  onClick={this.searchConversations}>Search Conversations</button>
                <button className="mdl-button mdl-js-button mdl-button--raised side-nav-button"
                  onClick={this.searchUsers}>Search Users</button>

                {child}
              </nav>
            </div>
            <main className="mdl-layout__content" id="right-nav-bar-content">

                  <div className="page-content message-pane-holder">{displayChildren}</div>

            </main>
          </div>
          <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
            <div className="mdl-layout__drawer sidebar-recolor" id="left-side-nav-bar">
              <nav className="mdl-navigation" id="no-padding-top">
                <ConversationIndex editConversation={this.editConversation}/>
              </nav>
            </div>
          </div>
          </div>
    );
  }

});

module.exports = MessageScreen;
