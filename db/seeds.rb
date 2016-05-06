# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# User.create(username: "Andrew", fname: "Andrew", lname: "Andrew", email: "Andrew", user_type: "user", password: "password")
# User.create(username: "user", fname: "user", lname: "user", email: "user", user_type: "user", password: "password")
# User.create(username: "user1", fname: "user1", lname: "user1", email: "user1", user_type: "user", password: "password")
# User.create(username: "user2", fname: "user2", lname: "user2", email: "user2", user_type: "user", password: "password")
# User.create(username: "user3", fname: "user3", lname: "user3", email: "user3", user_type: "user", password: "password")
# Conversation.create(title: "Test Conversation", description: "Test Conversation", owner_id: 1, private: false)

# ConversationUser.create(user_id: 1, conversation_id: 1)
# ConversationUser.create(user_id: 2, conversation_id: 1)
# ConversationUser.create(user_id: 3, conversation_id: 1)
# ConversationUser.create(user_id: 4, conversation_id: 1)
# ConversationUser.create(user_id: 5, conversation_id: 1)


User.create(username: "Andrew", fname: "Andrew", lname: "Andrew", email: "Andrew", user_type: "user", password: "secret_password")

Conversation.create(title: "General", description: "Talk about whatever you want", owner_id: 1, private: false)
Conversation.create(title: "Interview Prep", description: "Practice for interviews", owner_id: 1, private: false)
Conversation.create(title: "Job Hunting Resources", description: "Advice and resources for job hunters", owner_id: 1, private: false)
Conversation.create(title: "Job Postings", description: "See who's hiring", owner_id: 1, private: false)

20.times do
  fname = Faker::Name.first_name
  lname = Faker::Name.last_name
  email = Faker::Internet.safe_email(fname)
  user_name = Faker::Internet.user_name(fname)
  User.create(username: user_name, fname: fname, lname: lname, email: email, user_type: "user", password: "password")
end

21.times do |user_id|
  ConversationUser.create(user_id: user_id, conversation_id: 1)
  ConversationUser.create(user_id: user_id, conversation_id: 2)
  ConversationUser.create(user_id: user_id, conversation_id: 3)
  ConversationUser.create(user_id: user_id, conversation_id: 4)
end

Conversation.create(title: "Algorithm Help!", description: "Can anyone help me learn algorithms for interviews?", owner_id: 2, private: false)
Conversation.create(title: "Sales at Startups", description: "Are any startups hiring salespeople?", owner_id: 6, private: false)
Conversation.create(title: "Star Wars", description: "A chill conversation about Star Wars", owner_id: 10, private: false)
Conversation.create(title: "BounceBack is hiring", description: "Come work for us!", owner_id: 14, private: false)
Conversation.create(title: "Recruiters Unite", description: "Get advice on improving your recruitment process", owner_id: 18, private: false)

convo_id = 5

[2,6,10,14,18].each do |owner_id|
  ConversationUser.create(user_id: owner_id, conversation_id: convo_id)
  ConversationUser.create(user_id: owner_id + 1, conversation_id: convo_id)
  ConversationUser.create(user_id: owner_id + 2, conversation_id: convo_id)
  ConversationUser.create(user_id: owner_id + 3, conversation_id: convo_id)
  convo_id += 1
end




id_arr = (2..21).to_a.shuffle
conv1_body_arr = [
            "Anyone catch Game of Thrones last week?",
            "I haven't seen it yet. NO SPOILERS!",
            "Anyone think he'll actually finish The Winds of Winter before the end of the year?",
            "No way!",
            "If you like GRRM, you should read Patrick Rothfuss. He's a modern master of the genre.",
            "I don't read any fantasy written after 1973. Once Tolkein died it all went down hill.",
            "What are you talking about?!?!?!? You're missing out on so many good books.",
            "How do any of you have time to read or watch TV? I'm trying to send out 40 applications a week and barely have time to sleep."
           ]
8.times do
  Message.create(author_id: id_arr.pop, conversation_id: 1, body: conv1_body_arr.shift)
end


id_arr = (2..21).to_a.shuffle
conv2_body_arr = [
            "Anyone know a good place to get interview questions?",
            "I like Project Euler for general programming problems and Glassdoor for company specific questions",
            "Any suggestions for behavioral questions?",
            "Thoser are the same at most companies. How well do you work in a team? Talk about a problem you overcame? etc. Make sure to brush up on the STAR method of interviewing. It really helps."
           ]
4.times do
  Message.create(author_id: id_arr.pop, conversation_id: 2, body: conv2_body_arr.shift)
end


id_arr = (2..21).to_a.shuffle
conv3_body_arr = [
            "Has anyone had any success with HN's 'Who is hiring?' threads?",
            "I don't think they're very helpful. You can't sort by location or technology.",
            "I find Indeed.com and AngelList are better places to look.",
            "Any thoughts on meetups and hackathons?",
            "They're good if you can make real connnections. A referral can really help get your resume out of the pile.",
           ]
5.times do
  Message.create(author_id: id_arr.pop, conversation_id: 3, body: conv3_body_arr.shift)
end




id_arr = (2..21).to_a.shuffle
conv4_body_arr = [
            "PickupTix is looking for backend engineers. Take a look at PickupTix.io",
            "LogHealthy is looking for several full stack devs. More info at LogHealthy.com",
            "FeedMyCuriosity needs a front end programmer. Submit your resume at feedmycuriosity.site",
            "OffList is looking to fill a DevOps positon. See what we're all about at off-list.com"
           ]

4.times do
  Message.create(author_id: id_arr.pop, conversation_id: 4, body: conv4_body_arr.shift)
end



id_arr = (2..5).to_a.shuffle
conv5_body_arr = [
            "Can anyone help me understand Quicksort?",
            "Have you tried Google?"
           ]

2.times do
  Message.create(author_id: id_arr.pop, conversation_id: 5, body: conv5_body_arr.shift)
end

id_arr = (6..9).to_a.shuffle
conv6_body_arr = [
            "Any startups out there looking to hire salespeople?"
           ]

1.times do
  Message.create(author_id: id_arr.pop, conversation_id: 6, body: conv6_body_arr.shift)
end




id_arr = [10,11,12,13,10,11,12,13,10,11,12,13].shuffle
conv7_body_arr = [
                  "Favorite Star Wars movie? Why?",
                  "A New Hope, can't beat the original.",
                  "Episode IV for life!",
                  "The Force Awakens, JJ Abrams is just what the series needed.",
                  "What are you talking about? It's better than the prequels but doesn't hold a candle to Jedi.",
                  "Yeah, I can't believe nobody mentioned Jedi. It's clearly the best.",
                  "This is a moot point we knew Jedi was the best in 1983 and nothing has changed since then.",
                  "No love for Attack of the Clones?",
                  "Get out. There will be no discussion of the prequels here.",
                  "Do expanded universe works qualify? Heir to the Empire is my favorite."
                  ]

10.times do
  Message.create(author_id: id_arr.pop, conversation_id: 7, body: conv7_body_arr.shift)
end


id_arr = (14..17).to_a.shuffle
conv8_body_arr = [
            "BounceBack is looking for fullstack developers to help with their international expansion. The primary technologies are Ruby on Rails and ReactJS. Interested parties should submit their resumes hiring@bounceback.work.",
            "Is it possible to work remotely?",
            "Is this a junior or senior dev position?"
           ]

Message.create(author_id: 1, conversation_id: 8, body: conv8_body_arr.shift)

2.times do
  Message.create(author_id: id_arr.pop, conversation_id: 8, body: conv8_body_arr.shift)
end


id_arr = (18..21).to_a.shuffle
conv9_body_arr = [
            "Any other recruiters on this site?",
            "Yeah, I work with Triplebyte.",
            "Anyone want to meet up for coffee this weekend?",
            "I could do that, where?"
           ]

4.times do
  Message.create(author_id: id_arr.pop, conversation_id: 9, body: conv9_body_arr.shift)
end
