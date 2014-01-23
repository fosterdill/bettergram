class Api::CommentsController < ApplicationController
  def create
    @comment = Comment.new(
      :media_id => params[:media_id],
      :user_id => JSON.parse(
        REDIS.get('user_info' + session[:redis_token])
      )['id'],
      :body => params[:body]
    )
    if @comment.save
      render :json => @comment
    else
      render :json => @comment.errors, :status => 422
    end
  end
end
