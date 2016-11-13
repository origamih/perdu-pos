class Order < ActiveRecord::Base
  belongs_to :menu_item
  belongs_to :order_group
  enum status: { submitted: 0, void: 1, gift: 2 }
  validates_presence_of :status
end
