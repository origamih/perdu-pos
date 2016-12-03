class CreatePayments < ActiveRecord::Migration[5.0]
  def change
    create_table :payments do |t|
      t.integer :discount
      t.integer :cash
      t.integer :credit_card
      t.integer :voucher
      t.integer :total
      t.references :ticket, foreign_key: true

      t.timestamps
    end
  end
end
