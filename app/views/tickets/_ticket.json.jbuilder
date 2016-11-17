json.extract! ticket, :id, :note, :is_open, :table_id, :customer_id, :created_at, :updated_at
json.url ticket_url(ticket, format: :json)