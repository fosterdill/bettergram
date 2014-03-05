class Api::UsersController < ApplicationController
  def show
    unless params[:id]
      @user = current_instagram_client.user;
      @user[:posts] = current_instagram_client.user_recent_media;
      @user[:posts] = get_photo_comments @user[:posts].to_json
      render :json => @user
    else
      @user = current_instagram_client.user(params[:id])
      @user[:posts] = current_instagram_client.user_recent_media(params[:id]);
      @user[:posts] = get_photo_comments @user[:posts].to_json
      @user[:following] = 
        current_instagram_client.user_relationship(params[:id])
      render :json => @user
    end
  end
end
