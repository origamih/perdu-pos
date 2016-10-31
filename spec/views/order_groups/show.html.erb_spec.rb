require 'rails_helper'

RSpec.describe "order_groups/show", type: :view do
  before(:each) do
    @order_group = assign(:order_group, OrderGroup.create!(
      :ticket => nil,
      :user => nil
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(//)
    expect(rendered).to match(//)
  end
end
