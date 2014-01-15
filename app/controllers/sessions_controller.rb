class SessionsController < ApplicationController
  def new
    @user = User.new
    render :new
  end

  def create
    user_info = params[:user]
    @user = User.find_by_credentials(user_info[:username], 
                                     user_info[:password])

    if @user
      flash[:messages] = ["Logged in successfully!"]
      login!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid username or password!"]
      @user = User.new(user_info)
      render :new
    end
  end

  def destroy
    logout!
    redirect_to new_session_url
  end
end
