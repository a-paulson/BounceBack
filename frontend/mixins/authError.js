var UserStore = require('../stores/userStore');

var authError = {
  getInitialState: function(){
    return {errors: []};
  },

  componentDidMount: function(){
    this.errorListener = UserStore.addListener(this.newErrors);
  },

  componentWillUnmount: function() {
    this.errorListener.remove();
  },

  newErrors: function(){
    this.setState({errors: UserStore.getErrors()});
  }

};

module.exports = authError;
