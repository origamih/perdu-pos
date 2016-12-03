FactoryGirl.define do
  factory :payment do
    discount 1
    cash 1
    credit_card 1
    voucher 1
    total 1
    ticket nil
  end
end
