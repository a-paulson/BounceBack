json.extract! @conversation, :id, :title, :description
json.messages do
  json.array! @conversation.messages, partial: "api/conversations/message", as: :message
end
