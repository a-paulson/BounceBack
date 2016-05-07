# BounceBack

[BounceBack][heroku]

[heroku]: http://bounce_back.work

BounceBack is a full-stack messaging app that allows many users to chat together in real time. The goal is to create community where job searchers can interact with companies, look for advice, and socialize. The backend is built using Ruby on Rails with a PostgreSQL database.   The frontend is built on Facebook's ReactJS using Flux architecture and the design is done using Google's Material Design Lite.

## Features & Implementation

### Guest login

BounceBack implements anonymous guest users as first class users. This both fits with its mission, allowing users to discreetly discuss details of their jobs or offers, and solves several technical problems. Since guest users are no different than any other user multiple guests can be logged in at the same time. This creates a smoother experience for those interested in trying BounceBack without signing up.

Guests are created through a custom rails route that calls a custom creation method in the `User` model. Upon creation, guests are assigned a unique 4 digit identifier. This differentiates messages from different users and allows a reasonable number of guest accounts to be created. In order to prevent guest accounts from being reused their password_digest is set to "guest". Since BounceBack uses `BCrypt` to secure passwords, setting the password_digest manually precludes the existence of a valid password. Once a guest account is logged out, no one can access that account again.

```ruby
#This method generates new guest accounts in the User model
def self.guest_user
  username = nil

  while(username.nil? || User.find_by(username: username))
    username = "Guest" + rand(10000).to_s.rjust(4, "0")
  end

  guest_user = User.create!(username: username,
                            fname: "guest",
                            lname: "guest",
                            email: username,
                            user_type: "guest",
                            password_digest: "guest")
end
```

### Three Pane Message Screen

Bounce Back organizes all your content into three easy panes. The two bars, on the left and right side of screen, provide easy navigation while the center is reserved for messages or instructions. ReactJS makes this easy by allowing a component to render a variable holding JSX. The whole messaging app is held in a single message screen component.

![image of messaging layout](https://raw.githubusercontent.com/a-paulson/BounceBack/master/docs/app_view.png)

The left nav bar interactions are implemented by rendering a `child` variable holding JSX. This is accomplished using a `switch` statement based on the `state` set by the user's interaction with the navigation bar.

```javascript
//Sample from the switch statement that creates subcomponents for the left nav bar.
switch (this.state.child) {
  case "new-conversation":
    child = (
      <div className="left-nav-subsection">
        <button className="mdl-button mdl-js-button mdl-button--raised side-nav-button"
          onClick={this.resetNavBar}>
          Close
        </button>
        <ConversationForm conversationId={this.state.conversationId} onFinish={this.resetNavBar}/>
      </div>
    );
    break;
```
The center content is added using the React Router. After a redesign, where I moved functionality to the nav bars, I realized I only needed one route. This route shows all the messages from the specified conversation. A component can easily navigate to the new conversation by calling `hashHistory.push(message/ + conversationId)`.

```javascript
var routes =(
  <Route path="/" component={MessageScreen}>
      <Route path="messages/:conversationId" component={MessagePane} />
  </Route>
);
```

Using the react router made it easy to implement conversation selection on the right nav bar. The right bar has the `ConversationIndex` which holds many `ConversationIndexItems`. Flux architecture provides an easy way to trace the data flow that populates the `ConversationIndex`. When the page renders and AJAX request is sent to `/api/conversations`. The list of conversations the current user is subscribed to is returned as `JSON`. This is then sent to the `Dispatcher` which passes it onto the `ConversationStore`. The `ConversationStore` then emits a change event which causes the `ConversationIndex` to query the `ConversationStore` for all conversations. This cyclic architecture makes it very easy to debug by tracing the flow of data to quickly find where the problem is.

Once your Flux cycle is setup, actually rendering any component is fairly trivial. The `ConversationIndexItem` is probably the most complex and it still only takes 11 lines of code.

```javascript
//From conversationIndexItem.jsx
render: function() {
  var conversation = this.props.conversation;
    return (
      <div className="conversation-index-item-div">
        <a className="mdl-navigation__link" onClick={this.handleClick} href="">
          <h5 className="conversation-title">{conversation.title}</h5>
          <p>{conversation.description}</p>
        </a>
        {this.manipulateConversation()}
      </div>
    );
}
```

### Real Time Messaging

BounceBack uses [Pusher](https://pusher.com/) to implement real time messaging. Pusher makes websockets easy by providing an intuitive way to create channels that are accessible by both server and browser. On the server you have to trigger an event each time a message is added to a conversation.

```Ruby
#Pusher setup on the server from message_controller.rb
Pusher.trigger('conversation_' + @message.conversation_id.to_s, 'new_message', {})
```

On the browser side you access the Pusher api using your api key. Then you subscribe to the same channel the server is using to pass events. In BounceBack there is a channel for each conversation. However the browser only subscribes to the channel for the currently displayed conversation. Then when the browser receives an event from the server it calls a `ConversationClientAction` to refetch the conversation with its new messages. This then goes through the flux loop and the new messages are displayed on the screen.

```javascript
//Pusher setup in the browser from messagePane.jsx
componentDidMount: function() {
  this.conversationListener = ConversationStore.addListener(this._onChange);
  this.pusher = new Pusher(pusherSecretKey, {
    encrypted: true
  });

  var self = this;
  var channel = this.pusher.subscribe('conversation_' + this.props.params.conversationId);

  channel.bind('new_message', function(data) {
    ConversationClientActions.fetchConversation(parseInt(self.props.params.conversationId));
  });
},
```

### Fuzzy Search

In order to search users and conversations I wanted to implement a fuzzy search. My search looks for the letters you type in the order you type but it does not care what appears between them. This allows you to type the most important parts of your search query instead of having to type it out in full. The first step in implementing fuzzy search for conversations was to return all conversations the current user is not subscribed to. This was much harder than I anticipated and eventually required a custom SQL query. This query selects all conversations that don't have conversation_user entry for the current user. Conversation_users is a join table the records a users subscriptions.

```SQL
/* Here is the raw SQL query from conversation_controller.rb */
  SELECT "conversations".*
  FROM "conversations"
  LEFT OUTER JOIN (
    SELECT *
    FROM "conversation_users"
    WHERE "user_id" = #{current_user.id}
  ) AS CU
  ON CU."conversation_id" = "conversations"."id"
  WHERE "conversations"."private" = false
  AND CU."id" IS NULL
  ORDER BY LOWER("conversations".title), "conversations".title
```

Once the front end receives this list of conversations it filters the using regular expressions. I made liberal user of the `.*` pattern to implement the fuzzy searching.

```javascript
//This generates the regular expression used for fuzzy search in searchConversations.jsx
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
```

### Material Design Lite

I was excited to use Material Design Lite to do the design for this project. The whole philosophy underpinning material design is extremely interesting and I encourage you to read about it [here](https://www.google.com/design/spec/material-design/introduction.html). I used both vanilla [Material Design Lite](https://getmdl.io/index.html) and [React-MDL](https://tleunen.github.io/react-mdl/) to style different portions of this app. Even though I needed to override a significant portion of their defaults with custom CSS, I was still able to quickly realize my design.

## Future Directions for the Project

I plan to continue developing BounceBack to improve both functionality and user experience.

### ChatBots

I want to use the [Microsoft Bot Framework](https://dev.botframework.com/) to write a chatbot for my users to chat with. The goal is to give it interview questions so it can help users prepare for their interviews.

### Video Messaging

It would be nice if users could choose to conduct their direct messaging via video chat. This would allow recruiters to conduct interviews over the site. [WebRTC](https://webrtc.org/) provides a good library for video that I am interested in exploring.
