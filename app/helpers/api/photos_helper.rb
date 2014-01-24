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

  def get_photo_comments posts
    photo_ids = []
    photos = JSON.parse(posts)

    photos.each do |photo|
      photo_ids << photo['id']
    end

    comments = Comment.find_by_sql([<<-SQL, photo_ids])
      SELECT
        *
      FROM
        comments
      WHERE
        comments.media_id IN (?)
    SQL

    photos.map do |obj|
      obj[:comments] = comments.select do |comment| 
        comment.media_id == obj['id']
      end
    end

    photos
  end
end
