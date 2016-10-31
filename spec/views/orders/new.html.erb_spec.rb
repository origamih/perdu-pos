require 'rails_helper'

RSpec.describe "orders/new", type: :view do
  before(:each) do
    assign(:order, Order.new(
      :quantity => "",
      :ticket => nil,
      :menu_item => nil,
      :user => nil
    ))
  end

  it "renders new order form" do
    render

    assert_select "form[action=?][method=?]", orders_path, "post" do

      assert_select "input#order_quantity[name=?]", "order[quantity]"

      assert_select "input#order_ticket_id[name=?]", "order[ticket_id]"

      assert_select "input#order_menu_item_id[name=?]", "order[menu_item_id]"

      assert_select "input#order_user_id[name=?]", "order[user_id]"
    end
  end
end
