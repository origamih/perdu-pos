require 'rails_helper'

RSpec.describe "menu_categories/new", type: :view do
  before(:each) do
    assign(:menu_category, MenuCategory.new(
      :name => "MyString"
    ))
  end

  it "renders new menu_category form" do
    render

    assert_select "form[action=?][method=?]", menu_categories_path, "post" do

      assert_select "input#menu_category_name[name=?]", "menu_category[name]"
    end
  end
end
