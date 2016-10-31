class Table < ActiveRecord::Base
  enum status: { available: 0, occupied: 1, bill_printed: 2 }
  validates_presence_of :status 
  has_many :tickets, dependent: :destroy
end
