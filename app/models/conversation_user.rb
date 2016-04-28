class ConversationUser < ActiveRecord::Base
  validates :conversation, :user, presence: true
  validates :conversation_id, uniqueness: {scope: :user_id}

  belongs_to :conversation
  belongs_to :user
end
