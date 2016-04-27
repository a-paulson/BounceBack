class RemoveConversationTypeFromMessages < ActiveRecord::Migration
  def change
    remove_index :messages, column: [:conversation_type, :conversation_id]
    remove_column :messages, :conversation_type
  end
end
