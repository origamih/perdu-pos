require 'rails_helper'

RSpec.describe "payments/index", type: :view do
  before(:each) do
    assign(:payments, [
      Payment.create!(
        :discount => 2,
        :cash => 3,
        :credit_card => 4,
        :voucher => 5,
        :total => 6,
        :ticket => nil
      ),
      Payment.create!(
        :discount => 2,
        :cash => 3,
        :credit_card => 4,
        :voucher => 5,
        :total => 6,
        :ticket => nil
      )
    ])
  end

  it "renders a list of payments" do
    render
    assert_select "tr>td", :text => 2.to_s, :count => 2
    assert_select "tr>td", :text => 3.to_s, :count => 2
    assert_select "tr>td", :text => 4.to_s, :count => 2
    assert_select "tr>td", :text => 5.to_s, :count => 2
    assert_select "tr>td", :text => 6.to_s, :count => 2
    assert_select "tr>td", :text => nil.to_s, :count => 2
  end
end
