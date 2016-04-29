var React = require('react');
var PropTypes = React.PropTypes;

var ConversationForm = React.createClass({

  render: function() {
    var submitText = "submit";
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <input type="submit" value={submitText} />
        </form>
      </div>
    );
  }

});

module.exports = ConversationForm;
