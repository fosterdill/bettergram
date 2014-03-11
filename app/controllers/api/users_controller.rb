class Api::UsersController < ApplicationController
  def show
      begin
        if params[:id]
          @user = current_instagram_client.user(params[:id])
          @user[:posts] = 
            current_instagram_client.user_recent_media(params[:id]);
          @user[:following] = 
            current_instagram_client.user_relationship(params[:id])
        else
          @user = current_instagram_client.user;
          @user[:posts] = current_instagram_client.user_recent_media;
        end
      rescue Exception => e
        @user = {}
        @user[:errors] = ["User is private"]
      else
        @user[:posts] = get_photo_comments @user[:posts].to_json
      end
      render :json => @user
  end
end
