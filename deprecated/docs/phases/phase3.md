# Phase 3: Notebooks and Tags (2 days)

## Rails
### Models
* Channel
* ChannelUser
* DirectMessage

### Controllers
* Api::ChannelsController (create, index, show)
* Api::DirectMessagesController (create, show)

### Views
* Channels/index.json.jbuilder
* DirectMessages/index.json.jbuilder

## Flux
### Views (React Components)
* ChannelIndex
  - ChannelIndexItem
* DirectMessageIndex
  - DirectMessageIndexItem

### Stores

### Actions
* ApiActions.receiveAllChannels -> triggered by ApiUtil
* ChannelActions.fetchAllChannels -> triggers ApiUtil

### ApiUtil
* ApiUtil.fetchAllChannels

## Gems/Libraries
