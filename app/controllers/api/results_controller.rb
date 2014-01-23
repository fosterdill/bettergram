class Api::ResultsController < ApplicationController
  def index
    if params[:type] == 'tags'
      render :json => current_instagram_client.tag_search(params[:query])
    elsif params[:type] == 'users'
      render :json => current_instagram_client.user_search(params[:query])
    end
  end
end
