require 'rails_helper'

RSpec.describe "order_groups/new", type: :view do
  before(:each) do
    assign(:order_group, OrderGroup.new(
      :ticket => nil,
      :user => nil
    ))
  end

  it "renders new order_group form" do
    render

    assert_select "form[action=?][method=?]", order_groups_path, "post" do

      assert_select "input#order_group_ticket_id[name=?]", "order_group[ticket_id]"

      assert_select "input#order_group_user_id[name=?]", "order_group[user_id]"
    end
  end
end
