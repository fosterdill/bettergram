class Api::CommentsController < ApplicationController
  def create
    @comment = current_instagram_client.create_media_comment(
      params[:media_id], 
      params[:text]
    )
    render :json => @comment
  end
end
