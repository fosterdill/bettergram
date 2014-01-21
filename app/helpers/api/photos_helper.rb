module Api::PhotosHelper
  def is_first_fetch?
    !params[:max_id]
  end

  def store_next_batch(photos)
    next_photos = current_instagram_client.user_media_feed({
      :max_id => JSON.parse(photos).last['id']
    }).to_json
    REDIS.set("photos#{session[:redis_token]}", next_photos)
  end
end
