require 'rails_helper'

RSpec.describe "menu_items/new", type: :view do
  before(:each) do
    assign(:menu_item, MenuItem.new(
      :name => "MyString",
      :price => "9.99",
      :menu_category => nil
    ))
  end

  it "renders new menu_item form" do
    render

    assert_select "form[action=?][method=?]", menu_items_path, "post" do

      assert_select "input#menu_item_name[name=?]", "menu_item[name]"

      assert_select "input#menu_item_price[name=?]", "menu_item[price]"

      assert_select "input#menu_item_menu_category_id[name=?]", "menu_item[menu_category_id]"
    end
  end
end
