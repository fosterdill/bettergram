module Api::PhotosHelper
  def is_first_fetch?
    !params[:max_id]
  end

  def cache_photos photos
    redis_key = 'photocache' + session[:redis_token]
    if (REDIS.get(redis_key).nil?)
      REDIS.set(redis_key, photos)
      REDIS.expire(redis_key, 300)
    end
  end
end
