# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(username: "Andrew", fname: "Andrew", lname: "Andrew", email: "Andrew", user_type: "user", password: "password")
User.create(username: "user", fname: "user", lname: "user", email: "user", user_type: "user", password: "password")
User.create(username: "user1", fname: "user1", lname: "user1", email: "user1", user_type: "user", password: "password")
User.create(username: "user2", fname: "user2", lname: "user2", email: "user2", user_type: "user", password: "password")
User.create(username: "user3", fname: "user3", lname: "user3", email: "user3", user_type: "user", password: "password")


Conversation.create(title: "Test Conversation", description: "Test Conversation", owner_id: 1)

ConversationUser.create(user_id: 1, conversation_id: 1)
ConversationUser.create(user_id: 2, conversation_id: 1)
ConversationUser.create(user_id: 3, conversation_id: 1)
ConversationUser.create(user_id: 4, conversation_id: 1)
ConversationUser.create(user_id: 5, conversation_id: 1)
