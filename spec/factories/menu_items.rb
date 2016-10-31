FactoryGirl.define do
  factory :menu_item do
    name "Hanky"
    price "9.99"
    association :menu_category
  end
end
