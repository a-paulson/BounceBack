class CreateConversations < ActiveRecord::Migration
  def change
    create_table :conversations do |t|
      t.string :title, null: false, index: true
      t.text :description, null: false
      t.timestamps null: false
    end
  end
end
