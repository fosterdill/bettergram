class Api::UsersController < ApplicationController
  def show
    @user = current_instagram_client.user(params[:id]);
    user[:posts] = current_instagram_client.user_recent_media(params[:id]);
    render :json => @user
  end

  def index
    @user = current_instagram_client.user;
    @user[:posts] = current_instagram_client.user_recent_media;
    render :json => @user
  end
end
