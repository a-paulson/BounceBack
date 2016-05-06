# Flux Cycles

<!-- Flux loops are organized by data type. Under each data type, there may
be sub-categories, and each action is listed with the sequence of events
that result from its invocation, ending with the API or store. Finally,
store listeners are listed at the end.

You should be able to use this document trace an **action** starting
with where it was invoked, through the **API**/**store** involved, and
finally to the **components** that update as a result. This is important
because once you start implementing your flux loops, that's precisely
what you'll need to do. -->
## Channel Cycles

### Channel API Request Actions

* `fetchAllChannels`
  0. invoked from `ChannelIndex` `didMount`/`willReceiveProps`
  0. `GET /api/channels/:userId` is called.
  0. `receiveAllChannels` is set as the callback.

* `fetchAllMessages`
  0. invoked from `MessageIndex` `didMount`/`willReceiveProps`
  0. `GET /api/channels/:channelId` is called.
  0. `receiveAllMessages` is set as the callback.

* `createMessage`
  0. invoked from post message button `onClick`
  0. `POST /api/channels/:channelId` is called.
  0. `receiveNewMessage` is set as the callback.

### Direct Message API Request Actions

* `fetchAllMessages`
  0. invoked from `MessageIndex` `didMount`/`willReceiveProps`
  0. `GET /api/direct_messages/:userId` is called.
  0. `receiveAllMessages` is set as the callback.

* `createMessage`
  0. invoked from post message button `onClick`
  0. `POST /api/direct_messages/:userId` is called.
  0. `receiveNewMessage` is set as the callback.

### Channel API Response Actions

  * `receiveAllChannels`
    0. invoked from an API callback.
    0. `Channel` store updates `_channels` and emits change.

### Store Listeners

  * `ChannelIndex` component listens to `Channel` store.

### Message API Response Actions

* `receiveAllMessages`
  0. invoked from an API callback.
  0. `Message` store updates `_messages` and emits change.

* `receiveNewMessage`
  0. invoked from an API callback.
  0. `Message` store adds `_messages[id]` and emits change.

### Store Listeners

* `MessageIndex` component listens to `Message` store.

## User Cycles

### User API Request Actions

* `fetchUserData`
  0. invoked from `UserForm` `didMount`
  0. `GET /api/users/:userId` is called.
  0. `receiveUserData` is set as the callback.

* `updateUser`
  0. invoked from `UserForm` `Submit` button `onClick`
  0. `PATCH /api/users/:userId` is called.

### User API Response Actions

* `receiveUserData`
  0. invoked from an API callback.
  0. `User` store updates `_users` and emits change.

### Store Listeners

* `UserForm` component listens to `User` store.
