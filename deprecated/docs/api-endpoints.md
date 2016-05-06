# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

### Users

- `GET /users/new`
- `POST /users`
- `PATCH /users`

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

## JSON API

### Channels

- `GET /api/channels/:channelId`
  - Returns channel chat log
- `GET /api/channels/:userId`
  - Returns all a user's channels
- `POST /api/channels/:channelId`
  - Posts a single message
- `GET /api/channels/:channelId/:postId`
  - Returns individual post (bonus feature)

### Direct Messages

- `GET /api/direct_messages/:userId`
  - Returns your messages with specified user
- `POST /api/direct_messages/:userId`
  - Posts a single message
- `GET /api/direct_messages/:userId/:postId`
  - Returns individual post (bonus feature)

### Users
- `GET /api/users/:userId`
- `PATCH /api/users/:userId`
- `GET /api/users/search`
