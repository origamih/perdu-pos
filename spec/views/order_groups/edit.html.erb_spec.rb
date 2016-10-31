require 'rails_helper'

RSpec.describe "order_groups/edit", type: :view do
  before(:each) do
    @order_group = assign(:order_group, OrderGroup.create!(
      :ticket => nil,
      :user => nil
    ))
  end

  it "renders the edit order_group form" do
    render

    assert_select "form[action=?][method=?]", order_group_path(@order_group), "post" do

      assert_select "input#order_group_ticket_id[name=?]", "order_group[ticket_id]"

      assert_select "input#order_group_user_id[name=?]", "order_group[user_id]"
    end
  end
end
