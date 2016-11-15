class UpdateTickets < ActiveRecord::Migration[5.0]
  def change
    remove_column :tickets, :status
    add_column :tickets, :is_open, :boolean
  end
end
