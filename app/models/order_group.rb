class OrderGroup < ActiveRecord::Base
  belongs_to :ticket
  belongs_to :user
end
