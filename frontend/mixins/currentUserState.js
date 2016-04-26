var UserStore = require('../stores/userStore');
var UserClientActions = require('../actions/user/userClientActions');

var CurrentUserStateMixin = {
  getInitialState: function(){
    return {currentUser: UserStore.currentUser(),
            userErrors: UserStore.getErrors()};
  },

  componentDidMount: function(){
    this.userListener = UserStore.addListener(this.updateUser);
    if(UserStore.currentUser() === undefined)
    {
      UserClientActions.fetchCurrenUser();
    }
  },

  updateUser: function(){
    this.setState({currentUser: UserStore.currentUser()});
    this.setState({userErrors: UserStore.getErrors()});
  }

};

module.exports = CurrentUserStateMixin;
