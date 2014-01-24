class Api::LikesController < ApplicationController
  def create
    like = current_instagram_client.user.like_media(params[:media_id])
    render :json => ["hi"]
  end

  def destroy
    unlike = current_instagram_client.user.unlike_media(params[:media_id])
    render :json => ["bye"]
  end
end
