json.array! @conversations do |conversation|
  json.extract! conversation, :id, :title, :description
end
