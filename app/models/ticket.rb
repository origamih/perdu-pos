class Ticket < ActiveRecord::Base
  belongs_to :table
  belongs_to :customer
  has_many :order_groups, dependent: :destroy
end
