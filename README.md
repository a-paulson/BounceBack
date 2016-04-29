# Bounce Back

[BounceBack.work][heroku]

[heroku]: http://bounceback.work/

## Minimum Viable Product

BounceBack is webchat application for job seeker. It offers a chance for users to hone their interview skills, interact with recruiters and discuss job hunting. Inspiration came from Slack and Glassdoor. BounceBack will be built using Ruby on Rails and React with Flux architecture. The minimum viable product will contain the following features:

- [x] Account creation and user authentication
- [x] Realtime chat organized into conversations
- [ ] High quality seed data for conversations and rudimentary chatbots for direct messaging
- [x] Hosting on Heroku with a custom domain name
- [ ] A smooth bug free user experience
- [ ] Appealing CSS styling
- [ ] A production README with images and code snippets

## Product Goals and Priorities

BounceBack will allow users to do the following:

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

###Minimum Viable Product (MVP) Features

Users Can:

- [x] Create a new account
- [x] Sign in and out using their account, or a guest account
- [x] Post and read messages
- [ ] Create and join conversations with other users
- [ ] Interact with chatbots
- [ ] Engage with a well styled and bug free app

###Bonus Features

Users Can:

- [ ] Search for posts
- [ ] Search for other users
- [ ] Have visual feedback while their chat partner is typing, similar to Facebook chat or iMessage
- [ ] Like or star posts
- [ ] Post well formatted links
- [ ] Post mentions, linking to other users by name
- [ ] Post files and have those files to be maintained across sessions
- [ ] Post with different formatting using a markup language
- [ ] Create links to specific chat items
- [ ] View other users by clicking on their username
- [ ] Opt to post anonymously in public channels
- [ ] Create and administer private channels
- [ ] Display timestamps in a timezone of their choosing
- [ ] Setup notifications
- [ ] Chat with high quality bots
- [ ] Chat with me, a real human being
- [ ] Chat on a mobile platform via a mobile app or mobile web site

<!-- ## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[flux-cycles]: ./docs/flux-cycles.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md -->

## Implementation Timeline

### Phase 1: Auth Setup and Landing Page (1 days)

**Objective:** the user should be able to: View the splash page, create a new user and login, then view an initial landing screen

- [x] create new project
- [x] create `User` model
- [x] create auth controllers model
- [x] setup Webpack & Flux scaffold
- [x] setup React Router
- [x] Front end authentication
- [x] sign in page
- [x] sign up page
- [x] Guest Login
- [x] initial landing page after sign in
- [x] Push to Heroku

### Phase 2: Basic Chat Implementation (2 days)

**Objective:** Messages can be created, and viewed on the main screen. These messages persist between users and sessions and are displayed the same way to all users. Messages are updated dynamically for all users. Also create channels to have a conversation to hold these messages.

- [x] create `Message` model
- [x] create `Conversation` and `ConversationUser` model
- [x] CRUD API for conversations
- [x] jBuilder views for messages
- [x] jBuilder views for conversations
- [x] Implement Flux loop for messages and conversations
- [x] Create a React messageIndex with messageIndexItems to display messages
- [x] Create a React messageForm to create new messages
- [x] setup websockets for real time updates
- [x] Test these in browser
- [x] Test these across multiple users

### Phase 3: Initial Styling (1 days)

**Objective:** Complete initial styling, bringing unified look and color to all pages. I plan to use bootstrap to style the app.

- [ ] create a basic style guide
- [ ] Style and flesh out splash page
- [ ] position elements on the page
- [ ] add basic colors & styles

### Phase 4: Finish converstion CRUD actions (1 days)

**Objective:** Allow conversations to be viewed, selected and manipulated by the user. Finish fleshing out react components on message screen.

- [ ] Finish react components for conversation CRUD actions
- [ ] Debug conversation CRUD actions
- [ ] Allow for conversation search and subscription

### Phase 5: Chatbots (.5 day)

**Objective:** Implement a chatbot for user interaction.

- Create very simple chatbot that will ask practice interview questions.
  - [ ] First version will use an array of data with random selection.

### Phase 6: Guest Accounts (.5 days)

**Objective:** Fully flesh out the guest account. Make sure initial user experience is smooth and bug free.

- [ ] Decide on and implement UX for guest accounts
- [ ] Provide appropriate default settings for guest account
- [ ] Do polishing of user experience so MVP experience is bug free and smooth.


### Phase 7: Seed Data (0.5 days)

**objective:** Provide seed data for both bots and conversations.

- [ ] Add seed data to conversations to flesh out their contents
- [ ] Implement multiple bots with different behavior to simulate various interactions.

<!-- ### Phase 8: User Search (.5 day)

**objective:** Implement user search for direct messaging

- [ ] Add Flux loop for user search by username
- [ ] Add search bar React component
- [ ] Allow users to create new direct messages using user search. -->
### Phase 8: Final Styling and Refactoring (1 day)

**objective:** Make site beautiful, remove all bugs.

- [ ] Get feedback on styling, UX and bugs from classmates
- [ ] Make styling as professional as possible
- [ ] Remove any remaining bugs

##### Other bonus features will be added to this schedule as it is updated.

- Advanced Chatbot
  - [ ] Try and develop a more intelligent bot using [Microsoft Bot Framework](https://dev.botframework.com/).

<!-- User Accounts
MVP
  Anonymous Accounts
    Anonynimity only in channels and with bots, not in direct messaging
  Different Classes of accounts,
    job seeker,
    recruiter,
    anon,
    career coach
    Admins
    Demo
  Persistent login

Chat
  Text Messages can be posted
  They appear in order
  The history is maintained
  This Happens in real time

Channels - multiperson chats
  behave more like 1/2 chat, 1/2 message board
  All of the behavior above but multiperson
  Public v. Private
  Admins can admit and remove members
  Users can join and leave

Direct Message - 2 person chats
  peristent conversations,
  can be reordering and controled with gui (persistent even if removed)
  User search to set up chats with indviduals
  link from user's post to direct chat with them
  General search looks pretty cool
  Visually edit Channels
  Users can block other users they don't like

Account customization
  Profile Pic
  Username
  Real Name
  Email
  local time???

[ ] User account page
[ ] View and customize their account settings

  Chat Bots
    interview questions
    Technical and Behavioral
      Old school RPG interactions
    See: http://practiceyourvcpitch.com/

    Walkthrough for showing off

Splash Page

Bonus


Archive Search
User Searching

File upload
Liking/ Starring posts
Posting links
User Mentions
Markup/code????

Linking to chat items
Click on user name to get link to profile and direct message and files

Anon mode option for posting in public

Time zone support????
Notifications????

Hook up to my phone
iPhone app

Make sure to reset seed Data!!!
-->

<!-- [phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md -->


<!-- Notes:
          Enforcing one account per email,
          Add account recovery if time.

          Library auth?
          Allow to login with username or email

          Inclusion constraint on user_type

          use browser history?
          double confirm password
          add multiple admins for a conversation

          Make sure to show a user that they are logged in and their credentials in upper left corner of the screen.

          Persistent Login


          Style Everything

          This weekend pay Technical debt on front end auth
            local storage
            better mixin
            fix the errors loggin in and out from child components
            Figure out the default conversation UX

          Also pay technical debt on Conversation creation and editing
            Create conversations
            Edit conversations
            Delete conversations
            Add users
            Subscribe and unsubscribe
            Search for users and conversations
              Fuzzy search?
          -->
