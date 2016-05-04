var React = require('react');
var ConversationClientActions = require("../actions/conversation/conversationClientActions");
var ConversationStore = require("../stores/conversationStore");
var HashHistory = require("react-router").hashHistory;

var ConversationForm = React.createClass({
  getInitialState: function() {
    console.log("conversation form gis");
    if(this.props.conversationId){
      var conversation = ConversationStore.find(this.props.conversationId);
      return({
        title: conversation.title,
        description: conversation.description,
        id: conversation.id,
        errors: ""
      });
    }else {
      return ({
        title: "",
        description: "",
        errors: ""
      });
    }
  },

  componentDidMount: function() {
    console.log("conversation form cdm");
    this.conversationListener = ConversationStore.addListener(this.onChange);
  },

  componentWillUnmount: function() {
    this.conversationListener.remove();
  },

  onChange: function(){
    // debugger;
    var errors = ConversationStore.getErrors();
    if (errors.length !== 0){
      this.setState({errors: ConversationStore.getErrors()});
    } else{
      HashHistory.push("messages/" + ConversationStore.all().pop().id);
      console.log("finsh Form");
      this.props.onFinish(event);
    }
  },

  changeTitle: function(event){
    this.setState({title: event.target.value});
  },

  changeDescription: function(event){
    this.setState({description: event.target.value});
  },

  submitForm: function(event){
    event.preventDefault();
    if(this.props.conversationId){
      ConversationClientActions.editConversation({
        title: this.state.title,
        description: this.state.description,
        id: this.state.id,
        private: false
      });
    } else{
      ConversationClientActions.createConversation({
        title: this.state.title,
        description: this.state.description,
        private: false
      });
    }
  },



  render: function() {
    console.log("conversation form render");
    var submitText = this.props.conversationId ? "Edit Conversation" : "Create a new Conversation";
    return (
      <div>
        <h2>{submitText}</h2>
        <form onSubmit={this.submitForm}>
          <label>Title
          <input type="text" onChange={this.changeTitle} value={this.state.title} />
          </label>
          <br />
          <label>Description
          <input type="text" onChange={this.changeDescription} value={this.state.description} />
          </label>
          <input type="submit" value={submitText} />
        </form>
      </div>
    );
  }

});

module.exports = ConversationForm;
