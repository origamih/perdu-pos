class Ticket < ActiveRecord::Base
  belongs_to :table
  belongs_to :customer
  has_many :orders, dependent: :destroy
  enum status: { open: 0, closed: 1 }
  validates_presence_of :status 
end
