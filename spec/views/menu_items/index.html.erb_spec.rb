require 'rails_helper'

RSpec.describe "menu_items/index", type: :view do
  before(:each) do
    assign(:menu_items, [
      MenuItem.create!(
        :name => "Name",
        :price => "9.99",
        :menu_category => nil
      ),
      MenuItem.create!(
        :name => "Name",
        :price => "9.99",
        :menu_category => nil
      )
    ])
  end

  it "renders a list of menu_items" do
    render
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => "9.99".to_s, :count => 2
    assert_select "tr>td", :text => nil.to_s, :count => 2
  end
end
