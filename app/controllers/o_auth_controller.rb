class OAuthController < ApplicationController
  CALLBACK_URL = 'http://localhost:3000/oauth/callback'

  def callback
    response = Instagram.get_access_token(params[:code], 
                                          :redirect_uri => CALLBACK_URL)

    if response.access_token
      user = current_user
      user.access_token = response.access_token
      user.save!
      redirect_to '/'
    else
      flash[:errors] = ["An error occurred whilst loggin in to Instagram"]
      redirect_to new_session_url
    end
  end

  def connect
    if current_user.access_token
      redirect_to '/'
    else
      redirect_to(
        Instagram.authorize_url(:redirect_uri => CALLBACK_URL,
                                :scope => "likes comments relationships basic")
      )
    end
  end
end
