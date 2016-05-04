var React = require('react');
var ConversationStore = require('../stores/conversationStore');
var ConversationClientActions = require('../actions/conversation/conversationClientActions');

var ReactMDL = require('react-mdl');
var Textfield = ReactMDL.Textfield;
var List = ReactMDL.List;
var ListItem = ReactMDL.ListItem;
var ListItemAction = ReactMDL.ListItemAction;
var ListItemContent = ReactMDL.ListItemContent;
var Icon = ReactMDL.Icon;
var Tooltip = ReactMDL.Tooltip;

var searchConversations = React.createClass({
  getInitialState: function(){
    console.log("SearchConversations gis");
    return {query: "",
            searchConversations: ConversationStore.searchConversations()};
  },

  componentDidMount: function() {
    console.log("SearchConversations cdm");
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

    var matchingTitles = this.state.searchConversations.filter(function(conversation){
      return conversation.title.toLowerCase().match(searchRegEx) !== null;
    });

    var self = this;
    var conversationArr = matchingTitles.map(function(conversation){
      return(
        <ListItem>
          <ListItemContent onClick={self.lockInput.bind(self, conversation.title)}>
            {conversation.title}
          </ListItemContent>
          <Tooltip label="Subscribe">
            <Icon name="done" onClick={self.subscribe.bind(self, conversation.id)}/>
          </Tooltip>
        </ListItem>);
    });


    return(
      <div>
          <div className="left-nav-sub-box">
            <h4 className="left-nav-subtitle">Search Conversations</h4>
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
              {conversationArr}
            </List>
          </div>


      </div>
    );
  }
});

module.exports = searchConversations;
