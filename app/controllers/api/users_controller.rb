class Api::UsersController < ApplicationController
  def show
    @user = current_instagram_client.user(params[:id]);
    user[:posts] = current_instagram_client.user_recent_media(params[:id]);
    render :json => @user
  end

  def index
    @user = current_instagram_client.user;
    @user[:posts] = current_instagram_client.user_recent_media;
    @user[:posts] = get_photo_comments @user[:posts].to_json
    render :json => @user
  end
end
