var UserStore = require('../stores/userStore');
var hashHistory = require('react-router').hashHistory;

var LogoutMixin = {
  componentWillUpdate: function() {
    if (this.state.currentUser === undefined){
      hashHistory.push("/");
    }
  }
};

module.exports = LogoutMixin;
