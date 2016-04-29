@conversations.each do |conversation|
  json.set! conversation.id do
    json.extract! conversation, :id, :title, :description
    json.owner conversation.owner.username
  end
end
