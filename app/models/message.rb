class Message < ActiveRecord::Base
  validates :author, :body, :conversation, presence: true

  belongs_to :conversation
  belongs_to :author,
    primary_key: :id,
    foreign_key: :author_id,
    class_name: :User

end
