require 'rails_helper'

RSpec.describe "menu_items/edit", type: :view do
  before(:each) do
    @menu_item = assign(:menu_item, MenuItem.create!(
      :name => "MyString",
      :price => "9.99",
      :menu_category => nil
    ))
  end

  it "renders the edit menu_item form" do
    render

    assert_select "form[action=?][method=?]", menu_item_path(@menu_item), "post" do

      assert_select "input#menu_item_name[name=?]", "menu_item[name]"

      assert_select "input#menu_item_price[name=?]", "menu_item[price]"

      assert_select "input#menu_item_menu_category_id[name=?]", "menu_item[menu_category_id]"
    end
  end
end
