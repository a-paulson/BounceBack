class Conversation < ActiveRecord::Base
  validates :title, :description, :owner, presence: true

  belongs_to :owner,
  foreign_key: :owner_id,
  primary_key: :id,
  class_name: :User

  has_many :messages
  has_many :conversation_users, dependent: :destroy
  has_many :users, through: :conversation_users
end
