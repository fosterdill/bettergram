class Api::UsersController < ApplicationController
  def show
      begin
        if params[:id]
          @user = get_specific_user_data(params[:id])
        else
          @user = get_current_user_data
        end
      rescue Exception => e
        @user = {:errors => ["User is private"]}
      else
        @user[:posts] = get_photo_comments @user[:posts].to_json
      end
      render :json => @user
  end
end
