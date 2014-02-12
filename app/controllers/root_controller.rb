class RootController < ApplicationController
  before_filter :require_current_user

  def index
    cache_user_info
    render :index
  end
end
