class Api::CommentsController < ApplicationController
  def create
    cached_info = JSON.parse( REDIS.get('user_info' + session[:redis_token]) )
    @comment = Comment.new(
      :media_id => params[:media_id],
      :user_id => cached_info['id'],
      :body => params[:body],
      :username => cached_info['username']
    )
    if @comment.save
      render :json => @comment
    else
      render :json => @comment.errors, :status => 422
    end
  end
end
