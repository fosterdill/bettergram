class Api::PhotosController < ApplicationController
  def index
    session[:redis_token] ||= SecureRandom.urlsafe_base64
    if (has_client?)
      if (is_first_fetch?)
        redis_key = 'photocache' + session[:redis_token]
        cached_photos = REDIS.get(redis_key)
        if (cached_photos.nil?)
          @photos = current_instagram_client.user_media_feed().to_json
          cache_photos(@photos)
        else
          @photos = cached_photos
        end
      else
        @photos = current_instagram_client
                    .user_media_feed(:max_id => params[:max_id])
                    .to_json
      end

    else
      @photos = current_instagram_client.media_popular
    end

    photos = get_photo_comments @photos
    render :json => photos
  end
end
