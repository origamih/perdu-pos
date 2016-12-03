json.extract! payment, :id, :discount, :cash, :credit_card, :voucher, :total, :ticket_id, :created_at, :updated_at
json.url payment_url(payment, format: :json)