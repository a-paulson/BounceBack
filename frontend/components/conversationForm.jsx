var React = require('react');
var ConversationClientActions = require("../actions/conversation/conversationClientActions");
var ConversationStore = require("../stores/conversationStore");
var HashHistory = require("react-router").hashHistory;

var ReactMDL = require('react-mdl');
var Textfield = ReactMDL.Textfield;



var ConversationForm = React.createClass({
  getInitialState: function() {
    // console.log("conversation form gis");
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
    // console.log("conversation form cdm");
    this.conversationListener = ConversationStore.addListener(this.onChange);
  },

  componentWillUnmount: function() {
    this.conversationListener.remove();
  },

  componentWillReceiveProps: function(newProps){
    // console.log("Conversation Form cwrp");
    // console.log(newProps);
    if(this.props.conversationId !== newProps.conversationId){
      if(newProps.conversationId){
        var conversation = ConversationStore.find(newProps.conversationId);
        this.setState({
          title: conversation.title,
          description: conversation.description,
          id: conversation.id,
          errors: ""
        });
      }else {
        this.setState({
          title: "",
          description: "",
          errors: ""
        });
      }
    }
  },

  onChange: function(){
    // debugger;
    var errors = ConversationStore.getErrors();
    if (errors.length !== 0){
      this.setState({errors: ConversationStore.getErrors()});
    } else{
      HashHistory.push("messages/" + ConversationStore.all().pop().id);
      // console.log("finsh Form");
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
    // console.log("conversation form render");
    var submitText = this.props.conversationId ? "Update" : "Create";
    var submitTitle = this.props.conversationId ? "Edit Conversation" : "New Conversation";
    return (
      <div>
        <div className="left-nav-sub-box">
          <h4 className="left-nav-subtitle">{submitTitle}</h4>
        </div>

        <form onSubmit={this.submitForm}>
          <div className="left-nav-sub-box">
          <Textfield
            onChange={this.changeTitle}
            value={this.state.title}
            label="Title"
            style={{width: '200px'}}
            />
        </div>

        <div className="left-nav-sub-box">
        <Textfield
            onChange={this.changeDescription}
            value={this.state.description}
            label="Description"
            style={{width: '200px'}}
            />
          </div>
          <div className="left-nav-sub-box">
          <input type="submit" className="mdl-button mdl-js-button mdl-button--raised form-submit-button"
            onClick={this.resetNavBar} value={submitText} />
          </div>

        </form>
      </div>
    );
  }

});

module.exports = ConversationForm;
