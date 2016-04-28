class CreateConversationUsers < ActiveRecord::Migration
  def change
    create_table :conversation_users do |t|
      t.references :conversation, index: true, null: false
      t.references :user, index: true, null: false
      t.timestamps null: false
    end
    add_index :conversation_users, [:conversation_id, :user_id], unique: true
  end
end
