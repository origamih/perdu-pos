class HomeController < ApplicationController
  before_action :authenticate_user!
  def index
  end
  def pos
    @tables = Table.all;
  end
end
