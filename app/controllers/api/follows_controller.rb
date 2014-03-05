class Api::FollowsController < ApplicationController
  before_filter :get_client

  def create
    @result = @client.follow_user params[:user_id]
    render :json => @result
  end

  def destroy
    @result = @client.unfollow_user params[:id]
    render :json => @result
  end
end
