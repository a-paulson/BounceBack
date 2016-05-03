var React = require('react');
var ConversationStore = require('../stores/conversationStore');
var ConversationClientActions = require('../actions/conversation/conversationClientActions');

var searchConversations = React.createClass({
  getInitialState: function(){
    return {query: "",
            searchConversations: ConversationStore.searchConversations()};
  },

  componentDidMount: function() {
    this.conversationListener = ConversationStore.addListener(this.onChange);
    ConversationClientActions.fetchSearchConversations();
  },

  componentWillUnmount: function() {
    this.conversationListener.remove();
  },

  componentWillReceiveProps: function(){
    ConversationClientActions.fetchSearchConversations();
  },

  onChange: function(){
    this.setState({searchConversations: ConversationStore.searchConversations()});
  },

  changeQuery: function(event){
    this.setState({query: event.target.value});
  },

  lockInput: function(title){
    this.setState({query: title});
  },

  subscribe: function(id, event){
    event.preventDefault();
    ConversationClientActions.subscribeToConversation(id);
    ConversationClientActions.fetchSearchConversations();
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

    var matchingTitles = this.state.searchConversations.filter(function(conversation){
      return conversation.title.toLowerCase().match(searchRegEx) !== null;
    });

    var conversationArr = matchingTitles.map(function(conversation){
      return(
        <li onClick={this.lockInput.bind(this, conversation.title)} key={conversation.id}>
          {conversation.title}
          <button onClick={this.subscribe.bind(this, conversation.id)} >Subscribe</button>
        </li>);
    }.bind(this));

    return(
      <div>
        <h2>Search for new Conversations</h2>
        <input id="conversation-search" type="text" onChange={this.changeQuery} value={this.state.query}/>
        <ul>
          {conversationArr}
        </ul>
      </div>
    );
  }
});

module.exports = searchConversations;
