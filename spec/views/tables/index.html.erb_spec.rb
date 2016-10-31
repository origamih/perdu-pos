require 'rails_helper'

RSpec.describe "tables/index", type: :view do
  before(:each) do
    assign(:tables, [
      Table.create!(
        :name => "Name"
      ),
      Table.create!(
        :name => "Name"
      )
    ])
  end

  it "renders a list of tables" do
    render
    assert_select "tr>td", :text => "Name".to_s, :count => 2
  end
end
