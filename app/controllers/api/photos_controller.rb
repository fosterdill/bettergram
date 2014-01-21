class Api::PhotosController < ApplicationController
  def index
    if (has_client?)
      if (is_first_fetch?)
        @photos = current_instagram_client.user_media_feed().to_json
        session[:redis_token] ||= SecureRandom.urlsafe_base64
      else
        @photos = REDIS.get("photos#{session[:redis_token]}")
      end

      store_next_batch(@photos)
      # if (params[:max_id]) 
      #   @photos = current_instagram_client.user_media_feed(:max_id => params[:max_id])
      # else
      #   @photos = current_instagram_client.user_media_feed()
      # end
      render :json => @photos
    else
      @photos = current_instagram_client.media_popular
      render :json => @photos
    end
  end

  def show
    @photo = current_instagram_client.media_item(params[:id])
    render :json => @photo
  end

end
