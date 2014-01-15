class UsersController < ApplicationController
  before_filter :require_no_current_user

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(params[:user])

    if @user.save
      flash[:messages] = ["User created successfully!"]
      login!(@user)
      redirect_to connect_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end
end
