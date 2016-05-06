var UserStore = require('../stores/userStore');
var UserClientActions = require('../actions/user/userClientActions');
var hashHistory = require('react-router').hashHistory;

var CurrentUserStateMixin = {
  getInitialState: function(){
    return {currentUser: UserStore.currentUser(),
            userErrors: UserStore.getErrors()};
  },

  componentDidMount: function(){
    this.userListener = UserStore.addListener(this.updateUser);
    if(UserStore.currentUser() === undefined)
    {
      // console.log("client Action fetch currentUser");
      UserClientActions.fetchCurrentUser();
    }
  },

  componentWillUnmount: function() {
    this.userListener.remove();
  },

  updateUser: function(){
    this.setState({currentUser: UserStore.currentUser()});
    this.setState({userErrors: UserStore.getErrors()});
  }

};

module.exports = CurrentUserStateMixin;
