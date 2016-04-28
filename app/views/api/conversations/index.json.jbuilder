@conversations.each do |conversation|
  json.set! conversation.id do
    json.extract! conversation, :id, :title, :description
  end
end
