class Api::PhotosController < ApplicationController
  def index
    if (has_client?)
      if (is_first_fetch?)
        @photos = current_instagram_client.user_media_feed()
        session[:redis_token] ||= SecureRandom.urlsafe_base64

        Thread.new do
          next_photos = current_instagram_client.user_media_feed(
            max_id: @photos.last.id
          )
          session[:last_id] = next_photos.last.id
          REDIS.set("photos#{session[:redis_token]}", next_photos.to_json)
        end
        render :json => @photos
      else
        @photos = JSON.parse(REDIS.get("photos#{session[:redis_token]}"))

        Thread.new do
          next_photos = current_instagram_client.user_media_feed( 
            max_id: session[:last_id]
          )
          session[:last_id] = next_photos.last.id
          REDIS.set("photos#{session[:redis_token]}", next_photos.to_json)
        end
        render :json => @photos
      end
    else
      @photos = current_instagram_client.media_popular
      render :json => @photos
    end
  end

  def show
    @photo = current_instagram_client.media_item(params[:id])
    render :json => @photo
  end

  def is_first_fetch?
    !params[:max_id]
  end

  def test
    REDIS.set('dylan', 'hi')
    render :json => 'done'
  end

  def gettest
    render :json => REDIS.get('dylan')
  end
end
