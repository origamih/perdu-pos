class AddIsGiftAndIsVoidToOrders < ActiveRecord::Migration
  def change
    add_column :orders, :is_gift, :boolean
    add_column :orders, :is_void, :boolean
  end
end
