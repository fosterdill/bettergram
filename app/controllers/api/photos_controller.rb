class Api::PhotosController < ApplicationController
  def index
    @photos = current_instagram_client.user_media_feed
    render :json => @photos
  end

  def show
    @photo = current_instagram_client.media_item(params[:id])
    render :json => @photo
  end
end
