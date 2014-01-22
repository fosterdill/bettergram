class RootController < ApplicationController
  before_filter :require_current_user

  def index
    render :index
  end
end
