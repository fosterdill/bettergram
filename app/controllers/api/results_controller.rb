class Api::ResultsController < ApplicationController
  def index
    render :json => current_instagram_client.user_search(params[:query])
  end
end
