class AddIndexToMessagesAddNullConstraintToConvesationUsers < ActiveRecord::Migration
  def change
    add_index :messages, :conversation_id
    change_column :conversation_users, :user_id, :integer, null: false
    change_column :conversation_users, :conversation_id, :integer, null: false
  end
end
