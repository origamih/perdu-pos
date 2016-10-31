class AddStatusToCustomers < ActiveRecord::Migration
  def change
    add_column :customers, :status, :integer
  end
end
