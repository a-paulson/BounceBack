class EnforceUniquenesChannelUsers < ActiveRecord::Migration
  def change
    add_index :channel_users, [:channel_id, :user_id], unique: true
  end
end
