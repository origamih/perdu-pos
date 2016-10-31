class Customer < ActiveRecord::Base
  has_many :tickets, dependent: :destroy
  enum status: { available: 0, occupied: 1, bill_printed: 2 }
end
