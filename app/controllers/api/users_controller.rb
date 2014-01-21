class Api::UsersController < ApplicationController
  def show
    @user = JSON.parse REDIS.get("user_info#{session[:redis_token]}")
    @user[:posts] = current_instagram_client.user_recent_media
    render @user
  end
end
