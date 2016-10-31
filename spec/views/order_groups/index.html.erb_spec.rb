require 'rails_helper'

RSpec.describe "order_groups/index", type: :view do
  before(:each) do
    assign(:order_groups, [
      OrderGroup.create!(
        :ticket => nil,
        :user => nil
      ),
      OrderGroup.create!(
        :ticket => nil,
        :user => nil
      )
    ])
  end

  it "renders a list of order_groups" do
    render
    assert_select "tr>td", :text => nil.to_s, :count => 2
    assert_select "tr>td", :text => nil.to_s, :count => 2
  end
end
