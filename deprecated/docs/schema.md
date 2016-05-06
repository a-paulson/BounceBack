# Schema Information

## messages
column name         | data type | details
--------------------|-----------|-----------------------
id                  | integer   | not null, primary key
body                | text      | not null
author_id           | integer   | not null, foreign key (references users), indexed
conversation_id     | integer   | not null,

##Conversation
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
description | string    | not null
owner_id    | integer   | not null, foreign key (references users), indexed

## conversation_users
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
conversation_id  | integer   | not null, foreign key (references channels), indexed, unique [user_id]
user_id     | integer   | not null, foreign key (references users), indexed

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
fname           | string    | not null, indexed
lname           | string    | not null, indexed
email           | string    | not null, indexed
user_type       | string    | not null
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
