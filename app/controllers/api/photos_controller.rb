class Api::PhotosController < ApplicationController
  def index
    if (has_client?)
      if (is_first_fetch?)
        @photos = current_instagram_client.user_media_feed().to_json
        session[:redis_token] ||= SecureRandom.urlsafe_base64
      else
        @photos = REDIS.get("photos#{session[:redis_token]}")
      end

      Thread.new do
        store_next_batch(@photos)
      end
    else
      @photos = current_instagram_client.media_popular
    end

    render :json => @photos
  end
end
