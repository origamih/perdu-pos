require 'rails_helper'

RSpec.describe "tickets/new", type: :view do
  before(:each) do
    assign(:ticket, Ticket.new(
      :note => "MyString",
      :status => 1,
      :table => nil,
      :customer => nil
    ))
  end

  it "renders new ticket form" do
    render

    assert_select "form[action=?][method=?]", tickets_path, "post" do

      assert_select "input#ticket_note[name=?]", "ticket[note]"

      assert_select "input#ticket_status[name=?]", "ticket[status]"

      assert_select "input#ticket_table_id[name=?]", "ticket[table_id]"

      assert_select "input#ticket_customer_id[name=?]", "ticket[customer_id]"
    end
  end
end
