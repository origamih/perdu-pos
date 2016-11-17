class UpdateOrderColumns < ActiveRecord::Migration[5.0]
  def change
    remove_column :orders, :status
    add_column :orders, :is_submitted, :boolean
  end
end
