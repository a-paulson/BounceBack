var React = require('react');
var UserStore = require('../stores/userStore');
var UserClientActions = require('../actions/user/userClientActions');
var ConversationClientActions = require('../actions/conversation/conversationClientActions');

var ReactMDL = require('react-mdl');
var Textfield = ReactMDL.Textfield;
var List = ReactMDL.List;
var ListItem = ReactMDL.ListItem;
var ListItemAction = ReactMDL.ListItemAction;
var ListItemContent = ReactMDL.ListItemContent;
var Icon = ReactMDL.Icon;
var Tooltip = ReactMDL.Tooltip;

var searchUsers = React.createClass({
  getInitialState: function(){
    return {query: "",
            searchUsers: UserStore.getSearchUsers()};
  },

  componentDidMount: function() {
    this.userListener = UserStore.addListener(this.onChange);
    UserClientActions.fetchSearchUsers();
  },

  componentWillUnmount: function() {
    this.userListener.remove();
  },

  // componentWillReceiveProps: function(){
  //   UserClientActions.fetchSearchUsers();
  // },

  onChange: function(){
    this.setState({searchUsers: UserStore.getSearchUsers()});
  },

  changeQuery: function(event){
    this.setState({query: event.target.value});
  },

  lockInput: function(title){
    this.setState({query: title});
  },

  chatWith: function(id, username, event){
    event.preventDefault();
    var currentUser = UserStore.currentUser().user;
    ConversationClientActions.createDirectMessage({
      title: "Message: " + currentUser + ", " + username,
      description: "Direct message between " + currentUser + " and " + username,
      private: true,
      user_id: id
    });
    this.props.onFinish(event);
  },

  render: function () {
    if(this.state.query === ""){
      // var searchRegEx = new RegExp("^$");
      var searchRegEx = new RegExp("");
    } else{
      var queryChars = this.state.query.toLowerCase().split("");
      var regexString = ["^.*"];
      queryChars.forEach(function(char){
        if(char !== " "){
        regexString.push(char);
        regexString.push(".*");
      }
      });
      regexString = regexString.join("");
      var searchRegEx = new RegExp(regexString);
    }

    var matchingUsers = this.state.searchUsers.filter(function(user){
      return user.username.toLowerCase().match(searchRegEx) !== null;
    });

    var self = this;
    var userArr = matchingUsers.map(function(user){
      return(
        <ListItem key={user.id}>
          <ListItemContent onClick={self.lockInput.bind(self, user.username)}>
            {user.username}
          </ListItemContent>
          <Tooltip label="Message">
            <button className="mdl-button mdl-js-button mdl-button--fab subscription-button"
              onClick={self.chatWith.bind(self, user.id, user.username)}>
              <Icon name="question_answer" />
            </button>
          </Tooltip>
        </ListItem>);
    });

    // <li onClick={this.lockInput.bind(this, user.username)} key={user.id}>
    //   {user.username}
    //   <button onClick={this.chatWith.bind(this, user.id, user.username)}>Chat with this user.</button>
    // </li>);

    return(
      <div>
          <div className="left-nav-sub-box">
            <h4 className="left-nav-subtitle">Search Users</h4>
          </div>
            <div className="left-nav-sub-box">
            <Textfield
              onChange={this.changeQuery}
              value={this.state.query}
              label="Search..."
              style={{width: '200px'}}
              />
          </div>

          <div className="left-nav-sub-box">
            <List style={{width: '300px'}}>
              {userArr}
            </List>
          </div>


      </div>
    );
  }
});

module.exports = searchUsers;
