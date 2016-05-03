class AddConversationPrivacy < ActiveRecord::Migration
  def change
    add_column :conversations, :private, :boolean, null: false
  end
end
