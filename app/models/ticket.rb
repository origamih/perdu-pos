class Ticket < ActiveRecord::Base
  belongs_to :table, optional: true
  belongs_to :customer, optional: true
  has_many :order_groups, dependent: :destroy
  has_one :payment
end
