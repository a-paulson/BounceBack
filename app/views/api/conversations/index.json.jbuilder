# json.array! @conversations do |conversation|
#   json.extract! conversation, :id, :title, :description
# end
@conversations.each do |conversation|
  json.set! conversation.id do
    json.extract! conversation, :id, :title, :description
  end
end
