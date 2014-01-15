class SessionsController < ApplicationController
  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.find_by_credentials(params[:user])

    if @user
      flash[:messages] = ["Logged in successfully!"]
      login!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid username or password!"]
      render :new
    end
  end

  def destroy
    logout!
    redirect_to new_session_url
  end
end
