var React = require('react');
var UserStore = require('../stores/userStore');
var UserClientActions = require('../actions/user/userClientActions');

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

  componentWillReceiveProps: function(){
    UserClientActions.fetchSearchUsers();
  },

  onChange: function(){
    this.setState({searchUsers: UserStore.getSearchUsers()});
  },

  changeQuery: function(event){
    this.setState({query: event.target.value});
  },

  lockInput: function(title){
    this.setState({query: title});
  },

  subscribe: function(id, event){
    event.preventDefault();
    UserClientActions.subscribeToConversation(id);
    UserClientActions.fetchSearchUsers();
  },

  render: function () {
    if(this.state.query === ""){
      var searchRegEx = new RegExp("^$");
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

    var userArr = matchingUsers.map(function(user){
      return(
        <li onClick={this.lockInput.bind(this, user.username)} key={user.id}>
          {user.username}
          <button onClick={this.subscribe.bind(this, user.id)} >Subscribe</button>
        </li>);
    }.bind(this));

    return(
      <div>
        <h2>Search for Users by Username</h2>
        <input id="user-search" type="text" onChange={this.changeQuery} value={this.state.query}/>
        <ul>
          {userArr}
        </ul>
      </div>
    );
  }
});

module.exports = searchUsers;
