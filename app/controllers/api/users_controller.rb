class Api::UsersController < ApplicationController
  def show
      begin
        if params[:id]
          @user = current_instagram_client.user(params[:id])
          @user[:posts] = current_instagram_client.user_recent_media(params[:id]);
          @user[:following] = 
            current_instagram_client.user_relationship(params[:id])
          @user[:posts] = get_photo_comments @user[:posts].to_json
        else
          @user = current_instagram_client.user;
          @user[:posts] = current_instagram_client.user_recent_media;
          @user[:posts] = get_photo_comments @user[:posts].to_json
        end
      rescue Exception => e
        @user = {}
        @user[:errors] = ["User is private"]
      end
      render :json => @user
  end
end
