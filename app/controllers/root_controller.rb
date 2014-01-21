class RootController < ApplicationController
  before_filter :require_current_user

  def index
    if (has_client?)
      cache_user_info
    end
    render :index
  end
end
