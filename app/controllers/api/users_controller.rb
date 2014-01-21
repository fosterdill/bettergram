class Api::UsersController < ApplicationController
  def show
    @user = REDIS.get("user_info#{session[:redis_token]}")
    render :json => @user
  end
end
