class Api::UsersController < ApplicationController
  def show
    @user = JSON.parse REDIS.get("user_info#{session[:redis_token]}")
    render @user
  end
end
