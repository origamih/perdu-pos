class AddColumn < ActiveRecord::Migration[5.0]
  def change
    add_column :orders, :order_group_id, :integer
    add_foreign_key :orders, :order_groups
  end
end
