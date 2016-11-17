json.extract! order, :id, :quantity, :menu_item_id, :created_at, :updated_at, :is_gift, :is_void, :order_group_id, :is_submitted
json.url order_url(order, format: :json)