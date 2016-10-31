class CreateTickets < ActiveRecord::Migration
  def change
    create_table :tickets do |t|
      t.string :note
      t.integer :status
      t.belongs_to :table, index: true, foreign_key: true
      t.belongs_to :customer, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
