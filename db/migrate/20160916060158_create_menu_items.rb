class CreateMenuItems < ActiveRecord::Migration
  def change
    create_table :menu_items do |t|
      t.string :name
      t.decimal :price, precision: 8, scale: 2
      t.belongs_to :menu_category, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
