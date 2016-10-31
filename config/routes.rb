Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'

  resources :order_groups
  resources :customers
  resources :orders do
    collection do
      get 'show_by_params'
    end
  end
  resources :tickets do
    collection do
      get 'show_by_params'
    end
  end
  resources :menu_items do
    collection do
      post 'show_by_category'
    end
  end
  resources :menu_categories
  resources :tables
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'home#index', as: :root
  get '/pos' => 'home#pos'
  get 'home/index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
