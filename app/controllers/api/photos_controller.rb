class Api::PhotosController < ApplicationController
  def index
    if (has_client?)
      options = params[:max_id] ? {:max_id => params[:max_id]} : {}
      @photos = current_instagram_client.user_media_feed(options)
    else
      @photos = current_instagram_client.media_popular
    end
    render :json => @photos
  end

  def show
    @photo = current_instagram_client.media_item(params[:id])
    render :json => @photo
  end

  def test
    $redis.set('dylan', 'hi')
    render :json => 'done'
  end

  def gettest
    render :json => $redis.get('dylan')
  end
end
