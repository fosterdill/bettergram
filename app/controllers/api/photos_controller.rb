class Api::PhotosController < ApplicationController
  def index
    if (has_client?)
      if (is_first_fetch?)
        @photos = current_instagram_client.user_media_feed()

        Thread.new do 
          next_photos = current_instagram_client.user_media_feed({ 
            max_id: @photos.last().id
          })
          REDIS.set('photos', next_photos.to_json)
        end
        render :json => @photos
      else
        @photos = REDIS.get('photos')
        Thread.new do
          REDIS.set('photos',  current_instagram_client.user_media_feed({ 
            max_id: JSON.parse(@photos).last()[:id]
          }).to_json);
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
