class Conversation < ActiveRecord::Base
  validates :title, :description, presence: true

  has_many: :users, through: :channel_users
  has_many: :messages, as: :conversation
end
