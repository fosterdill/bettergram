class Api::PhotosController < ApplicationController
  def index
    @photos = current_instagram_client.user_media_feed
    render :json => @photos
  end
end
