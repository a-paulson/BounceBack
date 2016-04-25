# Phase 2: Flux Architecture and Note CRUD (2 days)

## Rails
### Models
* Message

### Controllers
* Api::MessageController (create, index)


### Views
* messages/index.json.jbuilder

## Flux
### Views (React Components)
* App
* MessagePane
* MessageIndex
  - MessageIndexItem
* MessageForm

### Stores
* Message

### Actions
* ApiActions.receiveAllMessages -> triggered by ApiUtil
* ApiActions.receiveNewMessage
* MessageActions.fetchAllMessages -> triggers ApiUtil
* MessageActions.createMessage

### ApiUtil
* ApiUtil.fetchAllMessages
* ApiUtil.createMessage

## Gems/Libraries
* Flux Dispatcher (npm)
* private_pub (Faye for Rails)
* websocket-rails 
* pusher
