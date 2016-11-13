class OrderGroup < ActiveRecord::Base
  belongs_to :ticket
  belongs_to :user
  has_many :orders, dependent: :destroy
end
