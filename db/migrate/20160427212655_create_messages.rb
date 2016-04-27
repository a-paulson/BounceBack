class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.integer :author_id, null: false, index: true
      t.text :body, null: false
      t.references :conversation, polymorphic: true, index: true, null:false
      t.timestamps null: false
    end
  end
end
