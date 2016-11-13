class RemoveColumns < ActiveRecord::Migration[5.0]
  def change
    remove_column :orders, :ticket_id
    remove_column :orders, :user_id
  end
end
