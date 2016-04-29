json.extract! @conversation, :id, :title, :description
json.owner @conversation.owner.username
json.messages do
  json.array! @conversation.messages, partial: "api/conversations/message", as: :message
end
