class CreateConversationUsers < ActiveRecord::Migration
  def change
    create_table :conversation_users do |t|
      t.references :conversation, index: true
      t.references :user, index: true
      t.timestamps null: false
    end
    add_index :conversation_users, [:conversation_id, :user_id], unique: true
    drop_table :channel_users
  end
end
