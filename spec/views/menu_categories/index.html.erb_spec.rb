require 'rails_helper'

RSpec.describe "menu_categories/index", type: :view do
  before(:each) do
    assign(:menu_categories, [
      MenuCategory.create!(
        :name => "Name"
      ),
      MenuCategory.create!(
        :name => "Name"
      )
    ])
  end

  it "renders a list of menu_categories" do
    render
    assert_select "tr>td", :text => "Name".to_s, :count => 2
  end
end
