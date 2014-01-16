class Api::PhotosController < ApplicationController
  def index
    if (has_client?)
      @photos = current_instagram_client.user_media_feed
    else
      @photos = current_instagram_client.media_popular
    end
    render :json => @photos
  end

  def show
    @photo = current_instagram_client.media_item(params[:id])
    render :json => @photo
  end
end
