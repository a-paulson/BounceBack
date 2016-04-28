class AddOwnerToConversation < ActiveRecord::Migration
  def change
    add_column :conversations, :owner_id, :integer, null: false
    add_index :conversations, :owner_id
  end
end
