# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(username: "user", fname: "user", lname: "user", email: "user", user_type: "user", password: "password")
User.create(username: "Andrew", fname: "Andrew", lname: "Andrew", email: "Andrew", user_type: "user", password: "password")
User.create(username: "Ben", fname: "Ben", lname: "Ben", email: "Ben", user_type: "user", password: "password")
User.create(username: "Gage", fname: "Gage", lname: "Gage", email: "Gage", user_type: "user", password: "password")

Conversation.create(title: "Test Conversation", description: "Test Conversation", owner_id: 2)

ConversationUser.create(user_id: 1, conversation_id: 1)
ConversationUser.create(user_id: 2, conversation_id: 1)
ConversationUser.create(user_id: 4, conversation_id: 1)
