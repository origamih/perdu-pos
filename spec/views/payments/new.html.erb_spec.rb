require 'rails_helper'

RSpec.describe "payments/new", type: :view do
  before(:each) do
    assign(:payment, Payment.new(
      :discount => 1,
      :cash => 1,
      :credit_card => 1,
      :voucher => 1,
      :total => 1,
      :ticket => nil
    ))
  end

  it "renders new payment form" do
    render

    assert_select "form[action=?][method=?]", payments_path, "post" do

      assert_select "input#payment_discount[name=?]", "payment[discount]"

      assert_select "input#payment_cash[name=?]", "payment[cash]"

      assert_select "input#payment_credit_card[name=?]", "payment[credit_card]"

      assert_select "input#payment_voucher[name=?]", "payment[voucher]"

      assert_select "input#payment_total[name=?]", "payment[total]"

      assert_select "input#payment_ticket_id[name=?]", "payment[ticket_id]"
    end
  end
end
