class Api::LikesController < ApplicationController
  def create
    like = current_instagram_client.like_media(params[:media_id])
    render :json => ["hi"]
  end

  def destroy
    unlike = current_instagram_client.unlike_media(params[:media_id].to_i)
    render :json => ["bye"]
  end
end
