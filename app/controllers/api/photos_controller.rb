require 'pp'
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

    photo_ids = []
    photos = JSON.parse(@photos)

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
    render :json => photos
  end
end
