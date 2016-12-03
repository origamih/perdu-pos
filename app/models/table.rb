class Table < ActiveRecord::Base
  enum status: { available: 0, occupied: 1, bill_printed: 2 }
  validates_presence_of :status 
  has_many :tickets, dependent: :destroy
  def self.open_tickets
    tables = Table.all.order(:name)
    tables.each do |table|
      ticket_count = Ticket.where(table_id: table.id, is_open: true).count
      if(ticket_count == 0)
        table.status = 0
      else
        table.status = 1
      end 
    end
    return tables
  end
end
