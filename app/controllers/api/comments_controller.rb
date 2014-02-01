class Api::CommentsController < ApplicationController
  def create
    # user_id = JSON.parse(
    # )['id']
    # p user_id
    #
    @comment = Comment.new(
      :media_id => params[:media_id],
      :user_id => JSON.parse(
        REDIS.get('user_info' + session[:redis_token])
      )['id'],
      :body => params[:body],
      :username => JSON.parse(
        REDIS.get('user_info' + session[:redis_token])
      )['username']
    )
    if @comment.save
      render :json => @comment
    else
      render :json => @comment.errors, :status => 422
    end
  end
end
