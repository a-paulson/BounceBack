var React = require('react');
var ConversationIndex = require("./conversationIndex");

var NavBar = React.createClass({

  render: function() {
    return (
      <div className="NavBar">
        <p>NavBar</p>
          <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
            <div className="mdl-layout__drawer">
              <span className="mdl-layout-title">Conversation Index</span>
              <nav className="mdl-navigation">
                <button onClick={this.newConversation}>Create a new Conversation</button>
                <ConversationIndex />
              </nav>
            </div>
            <main className="mdl-layout__content">
              <div className="page-content">Content</div>
            </main>
          </div>
      </div>

    );
  }

});

module.exports = NavBar;
