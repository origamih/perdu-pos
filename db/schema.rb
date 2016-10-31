# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161022170116) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "customers", force: :cascade do |t|
    t.string   "name"
    t.string   "phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "status"
  end

  create_table "menu_categories", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "menu_items", force: :cascade do |t|
    t.string   "name"
    t.decimal  "price",            precision: 8, scale: 2
    t.integer  "menu_category_id"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
  end

  add_index "menu_items", ["menu_category_id"], name: "index_menu_items_on_menu_category_id", using: :btree

  create_table "order_groups", force: :cascade do |t|
    t.integer  "ticket_id"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "order_groups", ["ticket_id"], name: "index_order_groups_on_ticket_id", using: :btree
  add_index "order_groups", ["user_id"], name: "index_order_groups_on_user_id", using: :btree

  create_table "orders", force: :cascade do |t|
    t.integer  "quantity"
    t.integer  "ticket_id"
    t.integer  "menu_item_id"
    t.integer  "user_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "status"
    t.boolean  "is_gift"
    t.boolean  "is_void"
  end

  add_index "orders", ["menu_item_id"], name: "index_orders_on_menu_item_id", using: :btree
  add_index "orders", ["ticket_id"], name: "index_orders_on_ticket_id", using: :btree
  add_index "orders", ["user_id"], name: "index_orders_on_user_id", using: :btree

  create_table "tables", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "status"
  end

  create_table "tickets", force: :cascade do |t|
    t.string   "note"
    t.integer  "status"
    t.integer  "table_id"
    t.integer  "customer_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "tickets", ["customer_id"], name: "index_tickets_on_customer_id", using: :btree
  add_index "tickets", ["table_id"], name: "index_tickets_on_table_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  add_foreign_key "menu_items", "menu_categories"
  add_foreign_key "order_groups", "tickets"
  add_foreign_key "order_groups", "users"
  add_foreign_key "orders", "menu_items"
  add_foreign_key "orders", "tickets"
  add_foreign_key "orders", "users"
  add_foreign_key "tickets", "customers"
  add_foreign_key "tickets", "tables"
end